import path from "path";
import axios from "axios";
import { config } from "dotenv";
import { writeFile } from "fs/promises";
import StreamZip from "node-stream-zip";

config({ path: "../.env", quiet: true });

const ZIP_FILE_PATH = path.resolve("uncompressed.zip"); // Zip file location

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

// Generating password according to the condition
function* generatePassword(minLen = 4, maxLen = 6) {
  for (let len = minLen; len <= maxLen; len++) {
    const total = CHARS.length ** len;
    for (let i = 0; i < total; i++) {
      let pass = "";
      let n = i;
      for (let j = 0; j < len; j++) {
        pass = CHARS[n % CHARS.length] + pass;
        n = Math.floor(n / CHARS.length);
      }
      yield pass;
    }
  }
}

// Download the problem zip
async function downloadZipFile() {
  const { data } = await axios.get(
    `https://hackattic.com/challenges/brute_force_zip/problem?access_token=9def105d03dce269`
  );
  const zipResponse = await axios.get(data.zip_url, {
    responseType: "arraybuffer",
  });

  await writeFile(ZIP_FILE_PATH, zipResponse.data); // Writing the zip file
  console.log("Finished Writing zip file");
}

// Crack the zip by brute forcing
async function crackZip() {
  for (const password of generatePassword(4, 6)) {
    console.log(`Trying password: ${password}`);
    try {
      const zip = new StreamZip.async({ file: ZIP_FILE_PATH, password });
      const content = await zip.entryData("secret.txt");
      const secret = content.toString().trim();
      console.log(`Password found: ${password}`);
      console.log(`Secret value: ${secret}`);

      zip.close();

      return secret;
    } catch (error) {
      // wrong password, move on
    }
  }
}

// Submit the result {secret: xxxxxxxx}
async function submitSolution(secret) {
  const { data } = await axios.post(
    `https://hackattic.com/challenges/brute_force_zip/solve?access_token=${process.env.TOKEN}`,
    { secret }
  );
  console.log(`Hackattic response: ${data.message}`);
}

// Entrypoint
async function main() {
  await downloadZipFile();
  const secret = await crackZip();
  await submitSolution(secret);
}

main();
