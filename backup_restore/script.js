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

const client = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB || "hackattic",
  port: Number(process.env.PORT) || 5432,
});
await client.connect();

async function getData() {
  const query = "SELECT ssn FROM criminal_records WHERE status=$1";
  const { rows } = await client.query(query, ["alive"]);
  return rows.map((row) => row.ssn);
}

(async () => {
  const response = await axios.get(
    `https://hackattic.com/challenges/backup_restore/problem?access_token=${process.env.TOKEN}`
  );
  const { dump } = response.data; // Get the postgres database dump from the problem

  const buf = Buffer.from(dump, "base64"); // Store the dump as buffer
  // console.log(buf);

  // Decompress the dump buffer
  const decompressed = await gunzipAsync(buf);
  const sql = decompressed.toString("utf8");

  const sqlPath = path.resolve("dump.sql");
  await writeFile(sqlPath, sql);
  console.log("SQL file written.");

  // Restore SQL file using psql
  const command = `psql -U ${process.env.DB_USER} -d ${promisify.env.DB} -f ${sqlPath}`;
  try {
    const { stdout, stderr } = await execAsync(command, {
      env: {
        ...process.env,
        PGPASSWORD: process.env.DB_PASSWORD, // for psql auth
      },
    });

    console.log("Database restored.");
    if (stderr) console.error(`psql stderr: ${stderr}`);
  } catch (error) {
    console.error(`psql restore failed: ${error}`);
    return;
  }

  // DB Query
  const aliveSSNs = await getData();
  const result = { alive_ssns: aliveSSNs };
  console.log(`Result to submit: ${result}`);

  // Submit solution
  const solve = await axios.post(
    `https://hackattic.com/challenges/backup_restore/solve?access_token=${process.env.TOKEN}`,
    result
  );

  console.log(`Hackattic response: ${solve.data}`);
  await client.end(); // Close pg client
})();
