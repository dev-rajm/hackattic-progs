import {getProblem} from "./packages/setup";

async function main() {
  const randomStr = await getProblem();
  console.log(randomStr);
}

main();
