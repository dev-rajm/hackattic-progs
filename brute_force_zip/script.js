import { exec } from "child_process";
import { promisify } from "util";
import fs, { readFileSync } from "fs";
import path from "path";
import axios from "axios";
import { config } from "dotenv";

config({ path: "../.env", quiet: true });

const execAsync = promisify(exec);

const workingDir = path.resolve();
fs.mkdirSync(workingDir, { recursive: true });

const encryptedZipPath = path.join(workingDir, "package.zip"); // Zip file location
const knownPlainZipPath = path.join(workingDir, "unprotected.zip");
const decryptedZipPath = path.join(workingDir, "decrypted.zip");
const knownPlainFile = "dunwich_horror.txt";

// Download the problem zip
async function downloadZipFile() {
  const { data } = await axios.get(
    `https://hackattic.com/challenges/brute_force_zip/problem?access_token=9def105d03dce269`
  );
  const zipResponse = await axios.get(data.zip_url, {
    responseType: "arraybuffer",
  });

  fs.writeFileSync(encryptedZipPath, zipResponse.data); // Writing the zip file
  console.log("Finished Writing zip file");
}

// Crack the zip by brute forcing
async function runPKCrack() {
  console.log("Running PkCrack...");
  try {
    const cmd = `C:\\Users\\rajma\\pkcrack\\bin\\pkcrack -a -C ${encryptedZipPath} -c ${knownPlainFile} -P ${knownPlainZipPath} -p ${knownPlainFile} -d ${decryptedZipPath}`;

    await execAsync(cmd);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

async function unzipAndReadSecret() {
  console.log("Unzipping...");
  const cmd = `7z x ${decryptedZipPath} -y -o ${workingDir}`;
  await execAsync(cmd, { cwd: workingDir });

  const secret = readFileSync(
    path.join(workingDir, "secret.txt"),
    "utf8"
  ).trim();

  console.log(`Secret: ${secret}`);
  return secret;
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
  await runPKCrack();
  await unzipAndReadSecret();
  // await submitSolution(secret);
}

main();
