import axios from "axios";
import {config} from "dotenv";

config({quiet: true});

interface SolutionType {
  sha256: string,
  hmac: string,
  pbkdf2: string,
  scrypt: string,
};

const problemURL = `https://hackattic.com/${process.env.PROBLEM_ENDPOINT}`;
const solutionURL = `https://hackattic.com/${process.env.SOLUTION_ENDPOINT}`;

export async function getProblem() {
  const result = await axios.get(problemURL);
  return result.data;
}

export async function submitResult(result: SolutionType) {
  const response = await axios.post(solutionURL, result);
  console.log("hackattic response: ", response.data);
}
