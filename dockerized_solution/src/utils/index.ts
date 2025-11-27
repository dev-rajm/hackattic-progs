import axios from "axios";
import http from "node:http";
import https from "node:https";
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
): Promise<string[]> {
  const { data } = await axios.post(
    `https://hackattic.com/_/push/${trigger_token}`,
    {
      registry_host: registry_host,
    },
    {
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    },
  );
  const tags = data.logs.match(/"Tag":"([^"]+)"/g)?.map((m : any) => m.split('"')[3]);
  console.log(tags);
  return tags;
}

export async function getProblemJSON(): Promise<ProblemJSON> {
  const { data } = await axios.get(
    `https://hackattic.com/challenges/dockerized_solutions/problem?access_token=${process.env.TOKEN}`,
  );
  return data;
}

export async function submitSolution(secret: string) {
  console.log("secret: ", secret);
  const { data } = await axios.post(
    `https://hackattic.com/challenges/dockerized_solutions/solve?access_token=${process.env.TOKEN}`,
    { secret: secret },
  );
  console.log("Hackattic response: ", data);
}
