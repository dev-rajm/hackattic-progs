import fs from "node:fs/promises";
import {exec} from "node:child_process";
import {promisify} from "node:util";
import {createHash} from "node:crypto";
import path from "node:path";

const execAsync = promisify(exec); // promisify the exec command

// write prefix file
export async function createPrefixFile(str: string) {
  await fs.writeFile("prefix.bin", str);
}

// generate suffix files using fastcoll tool via docker
export async function generateSuffixFiles() {
  const PWD = path.resolve();
  await execAsync(`docker run --rm -v ${PWD}:/work -w /work brimstone/fastcoll --prefixfile prefix.bin -o col1.bin col2.bin`);
}

export async function getFileBuffer(file: string) {
  const fileBuf = await fs.readFile(file);
  return fileBuf;
}
