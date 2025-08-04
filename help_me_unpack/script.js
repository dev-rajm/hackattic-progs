import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ quiet: true, path: "../.env" });

(async () => {
  // Get the problem json
  const { data } = await axios.get(
    `https://hackattic.com/challenges/help_me_unpack/problem?access_token=${process.env.TOKEN}`
  );

  // Convert base64 to raw bytes blob
  const buf = Buffer.from(data.bytes, "base64");

  // Build the solution
  const result = {
    int: buf.readInt32LE(0), // 0 - 3
    uint: buf.readUInt32LE(4), // 4 - 7
    short: buf.readInt32LE(8), // 8 - 11
    float: buf.readFloatLE(12), // 12 - 15
    double: buf.readDoubleLE(16), // 16 - 23
    big_endian_double: buf.readDoubleBE(24), // 24 - 31
  };

  // Submit the solution
  const solve = await axios.post(
    `https://hackattic.com/challenges/help_me_unpack/solve?access_token=${process.env.TOKEN}`,
    result
  );
  console.log(solve.data);
})();
