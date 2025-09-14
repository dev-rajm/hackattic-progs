import {createHash, createHmac, pbkdf2Sync, scryptSync} from "node:crypto";

export type ScryptType =  {
  N?: number,
  r?: number,
  p?: number,
  maxmem?: number
};

export async function generateSHA256(password: string, algo: string) {
  return createHash(algo).update(password).digest("hex");
}

export async function generateHMAC(password: string, algo: string, secret: Buffer) {
  return createHmac(algo, secret).update(password).digest("hex");
}

export async function generatePBKDF2(password: string, secret: Buffer, rounds: number, keyLen: number, algo: string) {
  const pbkdf2Hash = pbkdf2Sync(password, secret, rounds, keyLen, algo);
  return pbkdf2Hash.toString("hex");
}

export async function generateScrypt(password: string, secret: Buffer, keyLen: number, options: ScryptType) {
  const scryptHash = scryptSync(password, secret, keyLen, options);
  return scryptHash.toString("hex");
}
