import axios from "axios";
import { Client } from "pg";
import { config } from "dotenv";
import { writeFile } from "fs";
import path from "path";
import { gunzip } from "zlib";
import { promisify } from "util";
import { exec } from "child_process";

config({ path: "../.env", quiet: true });

const gunzipAsync = promisify(gunzip);
const execAsync = promisify(exec);

const SQL_FILE_PATH = path.resolve("dump.sql"); // Decompressed sql file path

const client = new Client({
  user: process.env.DB_USER ?? "postgres",
  host: process.env.DB_HOST ?? "localhost",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB ?? "hackattic",
  port: Number(process.env.PORT) || 5432,
});

// Get the postgres database dump from the problem and extract the dump
async function downloadAndExtractSQLDump() {
  try {
    const { data } = await axios.get(
      `https://hackattic.com/challenges/backup_restore/problem?access_token=${process.env.TOKEN}`
    );

    const buffer = Buffer.from(data.dump, "base64"); // Store the dump as buffer
    const decompressed = await gunzipAsync(buffer); // Decompress the dump buffer
    const sql = decompressed.toString("utf8");

    await writeFile(SQL_FILE_PATH, sql, (err) => {
      if (err) console.error(`Failed to write file: ${err.message}`);
      console.log("SQL Dump written to file");
    });
  } catch (error) {
    throw new Error(`Failed to download and write SQL dump: ${error.message}`);
  }
}

// Run psql to restore the db
async function restoreDatabase() {
  try {
    const restoreCommand = `psql -U ${process.env.DB_USER} -d ${process.env.DB} -f ${SQL_FILE_PATH}`;
    const { stdout, stderr } = await execAsync(restoreCommand, {
      env: {
        ...process.env,
        PGPASSWORD: process.env.DB_PASSWORD,
      },
    });

    if (stderr) console.warn(`psql stderr: ${stderr}`);
    console.log("Database restored");
  } catch (error) {
    throw new Error(`Failed to restore database: ${error.message}`);
  }
}

// Get data from db
async function getAllSSNs() {
  const query = "SELECT ssn FROM criminal_records WHERE status=$1";
  const { rows } = await client.query(query, ["alive"]);
  return rows.map((row) => row.ssn);
}

// submit solution
async function submitResult(aliveSSNs) {
  try {
    const payload = { alive_ssns: aliveSSNs };
    const { data } = await axios.post(
      `https://hackattic.com/challenges/backup_restore/solve?access_token=${process.env.TOKEN}`,
      payload
    );

    console.log(`Hackattic response: ${data.message}`);
  } catch (error) {
    throw new Error(`Failed to submit result: ${error.message}`);
  }
}

async function main() {
  try {
    await client.connect();
    await downloadAndExtractSQLDump();
    await restoreDatabase();

    const aliveSSNs = await getAllSSNs();
    console.log(`Alive SSNs extracted: ${aliveSSNs}`);

    await submitResult(aliveSSNs);
  } catch (error) {
    console.error(error.message);
  } finally {
    await client.end();
    console.log("PostgreSQL Client Closed");
  }
}

main();
