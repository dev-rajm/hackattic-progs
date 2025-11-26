import axios from "axios"
import https from "node:https";
import http from "node:http";
import { config } from "dotenv";

config({ quiet: true, path: __dirname + "/./../../../.env" });

type CREDENTIALS = {
  user: string;
  password: string;
};

interface ProblemJSON {
  credentials: CREDENTIALS;
  ignition_key: string;
  trigger_token: string;
}

export async function triggerPush(
  trigger_token: string,
  registry_host: string,
): Promise<void> {
  const { data } = await axios.post(
    `https://hackattic.com/_/push/${trigger_token}`,
    {
      registry_host: registry_host,
    },
    {
      httpAgent: new http.Agent({keepAlive: true}),
      httpsAgent: new https.Agent({keepAlive: true})
    }
  );
  console.log(data);
}

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
