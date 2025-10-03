import { getProblemJSON } from './packages/setup';

async function main() {
  const { difficulty, data, nonc } = await getProblemJSON();
  console.log(difficulty, data, nonc);
}

main();
