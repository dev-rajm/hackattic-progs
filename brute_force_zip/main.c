#include <cjson/cJSON.h>
#include <curl/curl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct memory {
  char *data;
  size_t size;
} memory_t;

static size_t write_to_buffer(void *contents, size_t size, size_t nmemb,
                              void *userp) {
  size_t real_size = size * nmemb;
  memory_t *mem = userp;

  char *ptr = realloc(mem->data, mem->size + real_size + 1);
  if (!ptr) {
    return 0;
  }

  mem->data = ptr;
  memcpy(&(mem->data[mem->size]), contents, real_size);
  mem->size += real_size;
  mem->data[mem->size] = '\0';

  return real_size;
}

static size_t write_to_file(void *ptr, size_t size, size_t nmemb,
                            void *stream) {
  return fwrite(ptr, size, nmemb, (FILE *)stream);
}

int main(void) {
  CURL *curl = NULL;
  FILE *fptr = NULL;
  cJSON *root = NULL;
  char *zip_url = NULL;
  int rc = EXIT_FAILURE;

  const char *token = getenv("HACKATTIC_TOKEN");
  if (!token) {
    fprintf(stderr, "HACKATTIC_TOKEN not set\n");
    return rc;
  }

  if (curl_global_init(CURL_GLOBAL_ALL) != CURLE_OK) {
    return rc;
  }

  curl = curl_easy_init();
  if (!curl) {
    goto cleanup;
  }

  char url[512];
  snprintf(url, sizeof(url),
           "https://hackattic.com/challenges/brute_force_zip/"
           "problem?access_token=%s",
           token);

  /* JSON request  */
  memory_t response = {0};

  curl_easy_setopt(curl, CURLOPT_URL, url);
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_to_buffer);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

  if (curl_easy_perform(curl) != CURLE_OK) {
    goto cleanup;
  }

  root = cJSON_Parse(response.data);
  if (!root) {
    goto cleanup;
  }

  cJSON *zip = cJSON_GetObjectItemCaseSensitive(root, "zip_url");
  if (!cJSON_IsString(zip)) {
    cJSON_Delete(root);
    goto cleanup;
  }

  zip_url = strdup(zip->valuestring);
  cJSON_Delete(root);
  root = NULL;
  free(response.data);
  response.data = NULL;

  /* writing the zip file */
  fptr = fopen("protected.zip", "wb");
  if (!fptr) {
    goto cleanup;
  }

  curl_easy_setopt(curl, CURLOPT_URL, zip_url);
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_to_file);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, fptr);

  if (curl_easy_perform(curl) != CURLE_OK) {
    goto cleanup;
  }

  fclose(fptr);
  fptr = NULL;

  /* run fcrackzip */
  fptr = popen("fcrackzip protected.zip -c a1 -l 4-6 -v -u 2>&1", "r");
  if (!fptr) {
    perror("popen");
    return 1;
  }

  char line[512];
  char password[128];

  while (fgets(line, sizeof(line), fptr)) {
    fputs(line, stdout);
    if (sscanf(line, "PASSWORD FOUND!!!!: pw == %127s", password) == 1) {
      break;
    }
  }

  pclose(fptr);

  if (password[0]) {
    printf("Password is: %s\n", password);
  } else {
    printf("Password not found!\n");
    goto cleanup;
  }

  /* unzip protected.zip */
  char unzip_cmd[512];
  snprintf(unzip_cmd, sizeof(unzip_cmd), "7z x protected.zip -p'%s'", password);
  system(unzip_cmd);

  /* read the secret.txt */
  fptr = fopen("secret.txt", "r");
  char secret[100];
  fgets(secret, sizeof(secret), fptr);

  /* send the secret to the solution endpoint */
  memory_t post_response = {0};

  char solution_url[512];
  char json_data[512];
  snprintf(json_data, sizeof(json_data), "{\"secret\":\"%s\"}", secret);
  snprintf(
      solution_url, sizeof(solution_url),
      "https://hackattic.com/challenges/brute_force_zip/solve?access_token=%s",
      token);
  printf("json=%s\n", json_data);

  curl_easy_setopt(curl, CURLOPT_URL, solution_url);
  curl_easy_setopt(curl, CURLOPT_POST, 1L);
  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json_data);
  curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, strlen(json_data));
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_to_buffer);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, &post_response);
  curl_easy_setopt(curl, CURLOPT_ACCEPT_ENCODING, "");
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);

  if (curl_easy_perform(curl) != CURLE_OK) {
    goto cleanup;
  }

  printf("Hackattic response: %s\n", post_response.data);
  printf("Cleaning data files\n");

  system("rm *.txt");
  system("rm protected*");

  rc = EXIT_SUCCESS;

cleanup:
  if (fptr)
    fclose(fptr);
  free(zip_url);
  free(response.data);
  if (curl)
    curl_easy_cleanup(curl);
  curl_global_cleanup();

  return rc;
}
