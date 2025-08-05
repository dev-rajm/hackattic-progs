import axios from "axios";
import { Client } from "pg";
import { config } from "dotenv";
import { writeFile } from "fs";
import path from "path";
import { gunzip } from "zlib";

config({ path: "../.env", quiet: true });

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: process.env.PORT,
});
await client.connect();

async function getData() {
  const query = "SELECT ssn FROM criminal_records WHERE status=$1";
  const { rows } = await client.query(query, ["alive"]);

  const aliveSSNs = rows.map((row) => row.ssn);

  return aliveSSNs;
}

(async () => {
  const response = await axios.get(
    `https://hackattic.com/challenges/backup_restore/problem?access_token=${process.env.TOKEN}`
  );
  const { dump } = response.data; // Get the postgres database dump from the problem

  const buf = Buffer.from(dump, "base64"); // Store the dump as buffer
  // console.log(buf);

  const __dirname = path.resolve();
  const sqlPath = path.resolve(__dirname, "dump.sql");

  // Decompress the dump buffer
  gunzip(buf, async (err, decompressBuf) => {
    if (err) {
      console.log(`Error while decompressing: ${err}`);
      return;
    }

    const sql = decompressBuf.toString("utf8"); // Decompressed SQL dump
    // console.log(sql);

    // Create the dump.sql file
    writeFile(sqlPath, sql, (err) => {
      if (err) {
        console.log(`Error while writing sql file: ${err}`);
        return;
      }

      console.log("Writing sql file successfully");
    });

    // psql -U postgres -d hackattic -f dump.sql (manually)

    setTimeout(async () => {
      // DB Query
      const SSNs = await getData();
      const result = { alive_ssns: SSNs };
      console.log(result);

      const solve = await axios.post(
        `https://hackattic.com/challenges/backup_restore/solve?access_token=${process.env.TOKEN}`,
        result
      );

      console.log(`Result: ${solve.data}`);
      await client.end();
    }, 50000);
  });
})();
