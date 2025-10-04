import { Block } from './setup';
import {createHash} from "node:crypto";

export function toSHA256(block: Block, nonce?:null | number): string {
  block.nonce = nonce || null;
  const keys = Object.keys(block);
  keys.sort();

  const sortedObj = keys.reduce((acc, key) => {
    acc[key] = (block as any)[key];
    return acc;
  }, {} as any);

  const content = JSON.stringify(sortedObj).replace(' ', '');
  return createHash("sha256").update(content).digest("hex");
}
