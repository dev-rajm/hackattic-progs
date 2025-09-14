import {getProblem, submitResult} from "./packages/setup";
import {saltDecoder} from "./packages/decoder";
import {ProblemSchemaType} from "./packages/schema";
import {generateSHA256, generateHMAC, generatePBKDF2, generateScrypt, ScryptType} from "./packages/helper.utils";

async function main() {
  const problemJSON : ProblemSchemaType = await getProblem();
  const {password, salt, pbkdf2, scrypt} = problemJSON;

  const secret = await saltDecoder(salt); // decode base64 salt
  const sha256Hash = await generateSHA256(password, "sha256"); // password -> sha256
  const hmacHash = await generateHMAC(password, pbkdf2.hash, secret); // password -> hmac
  const pbkdf2Hash = await generatePBKDF2(password, secret, pbkdf2.rounds, scrypt.buflen, pbkdf2.hash); // password -> pbkdf2

  const scryptOptions: ScryptType = {
    N: scrypt.N,
    r: scrypt.r,
    p: scrypt.p,
    maxmem: 512 * scrypt.r * scrypt.N,
  }
  const scryptHash = await generateScrypt(password, secret, scrypt.buflen, scryptOptions); // password -> scrypt

  // console.log("sha256Hash: ", sha256Hash);
  // console.log("hmacHash: ", hmacHash);
  // console.log("pbkdf2Hash: ", pbkdf2Hash);
  // console.log("scryptHash: ", scryptHash);

  const result = {
    sha256: sha256Hash,
    hmac: hmacHash,
    pbkdf2: pbkdf2Hash,
    scrypt: scryptHash,
  }
  console.log(result);
  await submitResult(result);
}

main();
