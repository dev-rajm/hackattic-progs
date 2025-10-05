import { getProblemJSON, submitSolution } from './packages/setup';

async function main() {
  const jwt_secret = await getProblemJSON();
}

main();
