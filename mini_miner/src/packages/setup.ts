import axios from 'axios';
import { config } from 'dotenv';

config({ quiet: true });

interface ProblemJSON {
  difficulty: number;
  data: string;
  nonc: number;
}

export async function getProblemJSON(): Promise<ProblemJSON> {
  const res = await axios.get(
    `https://hackattic.com/challenges/mini_miner/problem?access_token=${process.env.TOKEN}`,
  );

  const { difficulty, block } = res.data;
  const { nonc, data } = block;

  return { difficulty, data, nonc };
}

export async function submitSolution(result: Number) {
  const { data } = await axios.post(
    `https://hackattic.com/challenges/mini_miner/problem?access_token=${process.env.TOKEN}`,
    result,
  );
  console.log('Hackattic response: ', data);
}
