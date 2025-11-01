import forge from "node-forge";
import { getProblemJSON, submitSolution } from "./packages/setup";

async function main() {
  const { private_key, required_data } = await getProblemJSON();

  // load the private_key string into a forge private key
  const privateKey = forge.pki.privateKeyFromPem(
    "-----BEGIN PRIVATE KEY-----\n" +
    private_key +
    "\n-----END PRIVATE KEY-----",
  );
  const publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);

  // create the certificate
  const cert = forge.pki.createCertificate();
  cert.publicKey = publicKey;
  cert.serialNumber = String(required_data.serial_number);
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [
    {
      name: "commonName",
      value: required_data.domain,
    },
    {
      name: "countryName",
      value: required_data.country[0] + required_data.country.split(' ')[1][0],
    },
  ];

  cert.setSubject(attrs);
  cert.setIssuer(cert.subject.attributes);

  const extensions = [
    {
      name: "basicConstraints",
      cA: false, // certificate authority
    },
    {
      name: "keyUsage",
      digitalSignature: true,
      keyEncipherment: true,
    },
    {
      name: "subjectAltName",
      altNames: [{ type: 2, value: required_data.domain }],
    },
  ];

  cert.setExtensions(extensions);

  // sign the certificate
  cert.sign(privateKey, forge.md.sha256.create());

  // convert to der
  const derBytes = forge.asn1
    .toDer(forge.pki.certificateToAsn1(cert))
    .getBytes();
  const derBuf = Buffer.from(derBytes, "binary");
  const der64 = derBuf.toString("base64");

  await submitSolution(der64);
}

main();
