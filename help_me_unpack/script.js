import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ quiet: true, path: "../.env" });

// Get the problem and extract result
async function getProblemAndExtractResult() {
  try {
    const { data } = await axios.get(
      `https://hackattic.com/challenges/help_me_unpack/problem?access_token=${process.env.TOKEN}`
    );

    const buf = Buffer.from(data.bytes, "base64");

    // formatted result
    const result = {
      int: buf.readInt32LE(0), // 0 - 3
      uint: buf.readUInt32LE(4), // 4 - 7
      short: buf.readInt32LE(8), // 8 - 11
      float: buf.readFloatLE(12), // 12 - 15
      double: buf.readDoubleLE(16), // 16 - 23
      big_endian_double: buf.readDoubleBE(24), // 24 - 31
    };

    return result;
  } catch (error) {
    throw new Error(
      `Failed to get problem and extract result: ${error.message}`
    );
  }
}

// Submit solution
async function submitResult(result) {
  const { data } = await axios.post(
    `https://hackattic.com/challenges/help_me_unpack/solve?access_token=${process.env.TOKEN}`,
    result
  );

  console.log(`Hackattic response: ${data.message}`);
}

async function main() {
  const result = await getProblemAndExtractResult();
  await submitResult(result);
}

main();
