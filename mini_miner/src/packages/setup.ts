import axios from 'axios';
import { config } from 'dotenv';

config({ quiet: true, path: "../../../.env" });

export type Block = {
  data: [string, number][];
  nonce: number | null;
};

interface ProblemJSON {
  difficulty: number;
  block: Block;
}

export async function getProblemJSON(): Promise<ProblemJSON> {
  const res = await axios.get(
    `https://hackattic.com/challenges/mini_miner/problem?access_token=${process.env.TOKEN}`,
  );

  const { difficulty, block } = res.data;

  return { difficulty, block };
}

export async function submitSolution(nonce: number) {
  const { data } = await axios.post(
    `https://hackattic.com/challenges/mini_miner/solve?access_token=${process.env.TOKEN}`,
    { nonce: nonce },
  );

  console.log('Hackattic response: ', data);
}
