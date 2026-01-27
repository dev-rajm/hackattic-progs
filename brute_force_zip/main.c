#include <cjson/cJSON.h>
#include <curl/curl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct memory {
  char *data;
  size_t size;
} memory_t;

size_t write_data(void *contents, size_t size, size_t nmemb, void *userp) {
  size_t real_size = size * nmemb;
  memory_t *mem = (memory_t *)userp;

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

size_t write_file(void *ptr, size_t size, size_t nmemb, void *stream) {
  size_t written = fwrite(ptr, size, nmemb, (FILE *)stream);
  return written;
}

int main(void) {
  CURL *curl;
  CURLcode result = curl_global_init(CURL_GLOBAL_ALL);
  if (result) {
    return (int)result;
  }

  const char *file_name = "protected.zip";
  memory_t response;
  response.data = malloc(1);
  response.size = 0;

  const char *TOKEN = getenv("HACKATTIC_TOKEN");
  const char *base =
      "https://hackattic.com/challenges/brute_force_zip/problem?access_token=";

  size_t len = strlen(base) + strlen(TOKEN) + 1;
  char *url = malloc(len);
  if (!url) {
    return 1;
  }

  strcpy(url, base);
  strcat(url, TOKEN);

  curl = curl_easy_init();
  if (curl) {
    curl_easy_setopt(curl, CURLOPT_URL, url);
    free(url);
    curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

    result = curl_easy_perform(curl);
    if (result != CURLE_OK) {
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(result));
    }
    cJSON *root = cJSON_Parse(response.data);
    free(response.data);
    if (!root) {
      printf("Invalid JSON\n");
      return 1;
    }

    cJSON *zip = cJSON_GetObjectItemCaseSensitive(root, "zip_url");
    char *zip_url = zip->valuestring;

    // download zip file
    FILE *fptr;
    curl_easy_setopt(curl, CURLOPT_URL, zip_url);
    cJSON_Delete(root);
    curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L);
    curl_easy_setopt(curl, CURLOPT_NOPROGRESS, 1L);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_file);

    fptr = fopen(file_name, "wb");
    if (fptr) {
      curl_easy_setopt(curl, CURLOPT_WRITEDATA, fptr);
      result = curl_easy_perform(curl);
      fclose(fptr);
    }
    curl_easy_cleanup(curl);
  }
  curl_global_cleanup();
  return 0;
}
