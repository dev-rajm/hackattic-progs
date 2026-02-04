/* <DES>
 * Hackattic.com
 * Visual basic math
 * Auther: Rajm
 * Date: 03-02-2026
 * </DES>*/

#include <cjson/cJSON.h>
#include <curl/curl.h>
#include <leptonica/allheaders.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <tesseract/capi.h>

typedef struct memory {
  char *data;
  size_t size;
} memory_t;

size_t write_to_buffer(void *contents, size_t size, size_t nmemb, void *userp) {
  size_t rsize = size * nmemb;
  memory_t *mem = userp;

  char *ptr = realloc(mem->data, mem->size + rsize + 1);
  mem->data = ptr;
  memcpy(&(mem->data[mem->size]), contents, rsize);
  mem->size += rsize;
  mem->data[mem->size] = '\0';

  return rsize;
}

size_t write_to_file(void *contents, size_t size, size_t nmemb, void *stream) {
  return fwrite(contents, size, nmemb, (FILE *)stream);
}

int main(void) {
  CURL *curl = NULL;
  cJSON *root = NULL;
  FILE *fp = NULL;
  char *image_url = NULL;
  int rc = EXIT_FAILURE;

  const char *bash = "https://hackattic.com/challenges/visual_basic_math";
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
  snprintf(url, sizeof(url), "%s/problem?access_token=%s", bash, token);

  /* ---- Get the image_url ---- */
  memory_t response = {0};

  curl_easy_setopt(curl, CURLOPT_URL, url);
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_to_buffer);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

  if (curl_easy_perform(curl) != CURLE_OK) {
    goto cleanup;
  }

  /* ---- Extract image_url ---- */
  root = cJSON_Parse(response.data);
  cJSON *image = cJSON_GetObjectItemCaseSensitive(root, "image_url");
  image_url = strdup(image->valuestring);

  printf("image_url: %s\n", image_url);

  cJSON_Delete(root);
  root = NULL;
  free(response.data);
  response.data = NULL;

  /* ---- Writing the image file ---- */
  fp = fopen("image.png", "wb");

  curl_easy_setopt(curl, CURLOPT_URL, image_url);
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_to_file);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, fp);

  if (curl_easy_perform(curl) != CURLE_OK) {
    goto cleanup;
  }

  fclose(fp);
  fp = NULL;

  /* ---- calculate ---- */
  TessBaseAPI *api = TessBaseAPICreate();
  if (TessBaseAPIInit3(api, NULL, "eng")) {
    fprintf(stderr, "Could not initilize tesseract.\n");
    goto cleanup;
  }
  TessBaseAPISetVariable(api, "tessedit_char_whitelist", "0123456789+-*/÷×");

  PIX *img = pixRead("image.png");
  if (!image) {
    fprintf(stderr, "Could not read image.\n");
    goto cleanup;
  }

  TessBaseAPISetImage2(api, img);

  char *outText = TessBaseAPIGetUTF8Text(api);
  printf("%s\n", outText);

  TessBaseAPIDelete(api);

  rc = EXIT_SUCCESS;
cleanup:
  free(image_url);
  free(response.data);
  if (curl) {
    curl_easy_cleanup(curl);
  }
  curl_global_cleanup();

  return rc;
}
