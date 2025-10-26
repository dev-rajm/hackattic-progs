import { getProblemJSON } from "./packages/setup";

async function main() {
  const {private_key, required_data} = await getProblemJSON();
  console.log(private_key);
  console.log(required_data);
}

main();
