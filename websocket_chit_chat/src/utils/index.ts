import axios from "axios";
import { config } from "dotenv";

config({ quiet: true, path: __dirname + "/./../../../.env" });

type Token = { token: string };

export async function getProblemJSON(): Promise<Token> {
  const { data } = await axios.get(
    `https://hackattic.com/challenges/websocket_chit_chat/problem?access_token=${process.env.TOKEN}`,
  );
  console.log("token: ", data.token);
  return data;
}

export async function submitSolution(secret: string): Promise<void> {
  const { data } = await axios.post(
    `https://hackattic.com/challenges/websocket_chit_chat/solve?access_token=${process.env.TOKEN}`,
    { secret: secret },
  );
  console.log("hackattic response", data);
}
