import axios from "axios";
import { execSync } from "child_process";
import { config } from "dotenv";
import { writeFile } from "fs";
import path from "path";
import { gunzip } from "zlib";

config({ path: "../.env", quiet: true });

(async () => {
  const response = await axios.get(
    `https://hackattic.com/challenges/backup_restore/problem?access_token=${process.env.TOKEN}`
  );
  const { dump } = response.data; // Get the postgres database dump from the problem

  const buf = Buffer.from(dump, "base64"); // Store the dump as buffer
  console.log(buf);

  const __dirname = path.resolve();
  const sqlPath = path.resolve(__dirname, "dump.sql");

  // Decompress the dump buffer
  gunzip(buf, (err, decompressBuf) => {
    if (err) {
      console.log(`Error while decompressing: ${err}`);
      return;
    }

    const sql = decompressBuf.toString("utf8"); // Decompressed SQL dump
    console.log(sql);

    // Create the dump.sql file
    writeFile(sqlPath, sql, (err) => {
      if (err) {
        console.log(`Error while writing sql file: ${err}`);
        return;
      }

      console.log("Writing sql file successfully");
    });

    execSync(``);
  });
})();
