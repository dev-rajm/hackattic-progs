import {getProblem, submitResult} from "./packages/setup";
import {createPrefixFile, generateSuffixFiles, getFileBuffer} from "./packages/helper.utils";

async function main() {
  const randomStr = await getProblem(); // get the problem string

  await createPrefixFile(randomStr); // write the string in prefix.bin
  await generateSuffixFiles(); // generate two bin file that can collide with md5

  const col1Buf = await getFileBuffer("col1.bin");
  const col2Buf = await getFileBuffer("col2.bin");

  const file1b64 = col1Buf.toString("base64");
  const file2b64 = col2Buf.toString("base64");

  await submitResult(file1b64, file2b64);
}

main();
