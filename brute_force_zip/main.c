#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

size_t write_data_callback(void *buffer, size_t size, size_t nmemb, void *userp) {
  size_t written = fwrite(buffer, size, nmemb, (FILE *)userp);
  return written;
}

int main(void) {
  CURL *curl;
  CURLcode res = curl_global_init(CURL_GLOBAL_ALL);

  char *TOKEN = getenv("HACKATTIC_TOKEN");

  char *url = "https://hackattic.com/challenges/brute_force_zip/problem?access_token=";
  strcat(url, TOKEN);
  char *output_filename = "protected.zip";

  curl = curl_easy_init();

  if(curl) {
    FILE *file = fopen(output_filename, "wb");
    if(!file) {
      fprintf(stderr, "Error opening file %s\n", output_filename);
      return 1;
    }

    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data_callback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, file);

    res = curl_easy_perform(curl);

    if(res != CURLE_OK) {
      fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
    }

    fclose(file);
    curl_easy_cleanup(curl);
  }

  curl_global_cleanup();

  return 0;
}
