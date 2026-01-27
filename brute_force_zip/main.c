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

static size_t write_to_file(void *ptr, size_t size, size_t nmemb, void *stream) {
  return fwrite(ptr, size, nmemb, stream);
}

int main(void) {
  CURL *curl = NULL;
  FILE *fptr = NULL;
  char *zip_url = NULL;
  memory_t response = {0};
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
  curl_easy_setopt(curl, CURLOPT_URL, url);
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_to_buffer);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

  if (curl_easy_perform(curl) != CURLE_OK) {
    goto cleanup;
  }

  cJSON *root = cJSON_Parse(response.data);
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
  free(response.data);
  response.data = NULL;

  /* file download */
  fptr = fopen("protected.zip", "wb");
  if (!fptr) {
    goto cleanup;
  }

  curl_easy_setopt(curl, CURLOPT_URL, zip_url);
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_to_file);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, fptr);

  if(curl_easy_perform(curl) != CURLE_OK) {
    goto cleanup;
  }

  rc = EXIT_SUCCESS;

cleanup:
  if(fptr) fclose(fptr);
  free(zip_url);
  free(response.data);
  if(curl) curl_easy_cleanup(curl);
  curl_global_cleanup();

  return 0;
}
