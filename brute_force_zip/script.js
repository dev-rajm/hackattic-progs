import { exec } from "child_process";
import { promisify } from "util";
import { writeFileSync, readFileSync } from "fs";
import path from "path";
import axios from "axios";
import { config } from "dotenv";

config({ path: "../.env", quiet: true });

const execAsync = promisify(exec);

const workingDir = path.resolve();
// fs.mkdirSync(workingDir, { recursive: true });

const encryptedZipPath = path.join(workingDir, "package.zip"); // Problem zip location
const knownPlainZipPath = path.join(workingDir, "unprotected.zip"); // Unprotected zip with dunwich_horror.txt
const decryptedZipPath = path.join(workingDir, "decrypted.zip"); // Decrypted zip
const knownPlainFile = "dunwich_horror.txt";

// Download the problem zip
async function downloadZipFile() {
  console.log("Downloading problem zip...");
  const { data } = await axios.get(
    `https://hackattic.com/challenges/brute_force_zip/problem?access_token=9def105d03dce269`
  );
  const zipResponse = await axios.get(data.zip_url, {
    responseType: "arraybuffer",
  });

  writeFileSync(encryptedZipPath, zipResponse.data); // Writing the zip file
  console.log("Finished Downloading zip...");
}

// Crack the zip with PkCrack tool
async function runPKCrack() {
  console.log("Running PkCrack...");
  try {
    const cmd = `C:\\Users\\rajma\\pkcrack\\bin\\pkcrack -C ${encryptedZipPath} -c ${knownPlainFile} -P ${knownPlainZipPath} -p ${knownPlainFile} -d ${decryptedZipPath} -a`;

    const { stdout, stderr } = await execAsync(cmd, {
      cwd: workingDir,
      maxBuffer: 1024 * 1024 * 10,
    });

    if (stderr) console.error(`pkcrack stderr: ${stderr}`);

    console.log("Finish PkCrack...");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// unzip the decrypted zip file
async function unzipAndReadSecret() {
  console.log("Unzipping...");
  try {
    const cmd = `7z x ${decryptedZipPath} -y -o${workingDir}`;
    await execAsync(cmd, { cwd: workingDir });

    const secret = readFileSync(
      path.join(workingDir, "secret.txt"),
      "utf8"
    ).trim();

    console.log("Finished unzipping...");
    console.log(`Secret: ${secret}`);
    return secret;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Submit the result {secret: xxxxxxxx}
async function submitSolution(secret) {
  console.log("Submitting solution...");
  const { data } = await axios.post(
    `https://hackattic.com/challenges/brute_force_zip/solve?access_token=${process.env.TOKEN}`,
    { secret: secret }
  );
  console.log(`Hackattic response: ${JSON.stringify(data, null, 2)}`);
}

// Entrypoint
async function main() {
  await downloadZipFile();
  await runPKCrack();
  const result = await unzipAndReadSecret();
  await submitSolution(result);
}

main();
