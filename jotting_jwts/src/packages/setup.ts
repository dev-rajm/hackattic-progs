import axios from 'axios';
import { config } from 'dotenv';

config({ quiet: true });

export async function getProblemJSON() {
  const res = await axios.get(
    `https://hackattic.com/challenges/jotting_jwts/problem?access_token=${process.env.TOKEN}`,
  );
  const { jwt_secret } = res.data;
  return jwt_secret;
}

export async function submitSolution(app_url: string) {
  const res = await axios.post(
    `https://hackattic.com/challenges/jotting_jwts/solve?access_token=${process.env.TOKEN}`,
    { app_url: app_url },
  );

  console.log('Hackattic Response: ', res.data);
}
