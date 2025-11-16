import { getProblemJSON } from "./utils";

async function main() {
  const res = await getProblemJSON();
  console.log(res);
}

main();
