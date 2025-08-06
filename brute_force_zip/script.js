import axios from "axios";
import { exec } from "child_process";
import { config } from "dotenv";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { promisify } from "util";
import LineReader from "n-readlines";

config({ path: "../.env", quiet: true });

const execAsync = promisify(exec); // promisify exec to run 7z command

const ZIP_FILE_PATH = path.resolve("uncompressed.zip"); // Zip file location
const EXTRACT_DIR = path.resolve("unzipped"); // Extracted zip file location
const WORDLIST = path.resolve("rockyou.txt"); // Word list text file

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

// Extract the zip by brute force
async function extractZipFile() {
  // Guessing the password with length 4
  const lineReader = new LineReader(WORDLIST);
  let line = lineReader.next();
  while (line !== null) {
    const password = line.toString("utf8").toLowerCase();
    if (password.length >= 4 && password.length <= 6) {
      console.log(`Trying password: ${password}`);

      try {
        const extractCommand = `7z x -p${password} -o${EXTRACT_DIR} -y ${ZIP_FILE_PATH}`;
        await execAsync(extractCommand);
        console.log(`Password found: ${password}`);
        return;
      } catch (error) {}
    }
    line = lineReader.next();
  }
}

// Read the secret from 'secret.txt
async function extractSecret() {
  const content = await readFile(path.join(EXTRACT_DIR, "secret.txt"), "utf8");
  return content.trim();
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
  await extractZipFile();
  const secret = await extractSecret();
  await submitSolution(secret);
}

main();
