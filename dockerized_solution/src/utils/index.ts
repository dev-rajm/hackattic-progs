import axios from "axios";
import { config } from "dotenv";

config({ quiet: true, path: __dirname+"/./../../../.env" });

type CREDENTIALS = {
  user: string;
  password: string;
};

interface ProblemJSON {
  credentials: CREDENTIALS;
  ignition_key: string;
  trigger_token: string;
}

console.log(process.env.TOKEN);

export async function getProblemJSON(): Promise<ProblemJSON> {
  const { data } = await axios.get(
    `https://hackattic.com/challenges/dockerized_solutions/problem?access_token=${process.env.TOKEN}`,
  );
  return data;
}

export async function submitSolution() {
  const { data } = await axios.post(
    `https://hackattic.com/challenges/dockerized_solutions/solve?access_token=${process.env.TOKEN}`,
  );
  console.log("Hackattic response: ", data);
}
