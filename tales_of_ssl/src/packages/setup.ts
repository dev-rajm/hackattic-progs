import axios from "axios";
import { config } from "dotenv";

config({ quiet: true });

export type RequiredData = {
  domain: string;
  serial_number: string;
  country: string;
};

interface ProblemJSON {
  private_key: string;
  required_data: RequiredData;
}

export async function getProblemJSON(): Promise<ProblemJSON> {
  const { data } = await axios.get(
    `https://hackattic.com/challenges/tales_of_ssl/problem?access_token=${process.env.TOKEN}`,
  );
  return data;
}

export async function submitSolution(certificate: string) {
  const { data } = await axios.post(
    `https://hackattic.com/challenges/tales_of_ssl/solve?access_token=${process.env.TOKEN}`,
    { certificate: certificate },
  );

  console.log("Hackattic response: ", data);
}
