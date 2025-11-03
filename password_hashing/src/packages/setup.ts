import axios from "axios";
import {config} from "dotenv";

config({quiet: true, path: "../../../.env"});

interface SolutionType {
  sha256: string,
  hmac: string,
  pbkdf2: string,
  scrypt: string,
};

const problemURL = `https://hackattic.com/challenges/password_hashing/problem?access_token=${process.env.TOKEN}`;
const solutionURL = `https://hackattic.com/challenges/password_hashing/solve?access_token${process.env.TOKEN}`;

export async function getProblem() {
  const result = await axios.get(problemURL);
  return result.data;
}

export async function submitResult(result: SolutionType) {
  const response = await axios.post(solutionURL, result);
  console.log("hackattic response: ", response.data);
}
