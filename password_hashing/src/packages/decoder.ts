export async function saltDecoder(base64Str: string) {
  const bufObject = Buffer.from(base64Str, "base64");
  return bufObject;
}
