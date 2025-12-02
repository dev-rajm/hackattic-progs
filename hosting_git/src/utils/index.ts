import axios from "axios";
import { config } from "dotenv";

config({ quiet: true, path: __dirname + "/./../../../.env" });

interface ProblemJSON {
  ssh_key: string;
  username: string;
  repo_path: string;
  push_token: string;
}

export async function getProblemJSON(): Promise<ProblemJSON> {
  const { data } = await axios.get(
    `https://hackattic.com/challenges/hosting_git/problem?access_token=${process.env.TOKEN}`,
  );
  return data;
}
