import { getProblemJSON, submitSolution } from './packages/setup';
import { toSHA256 } from './packages/utils';

async function main() {
  const { difficulty, block } = await getProblemJSON();

  let hash = toSHA256(block);
  let leadingZeros = -1;
  let nonce = 0;
  const hex_zeros = Math.floor(difficulty / 4);

  while (leadingZeros !== hex_zeros) {
    nonce++;
    hash = toSHA256(block, nonce);
    leadingZeros = (hash.match(/^0+/) || [''])[0].length;
  }

  await submitSolution(nonce);
}

main();
