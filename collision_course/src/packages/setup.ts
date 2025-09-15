import axios from "axios";
import {config} from "dotenv";

config({quiet: true});

export async function getProblem() {
  const {data} = await axios.get(`https://hackattic.com/${process.env.PROBLEM_ENDPOINT}`);
  return data?.include;
}

export async function submitResult(result: string) {
  const {data} = await axios.post(`https://hackattic.com/${process.env.SOLUTION_ENDPOINT}`, result);
  console.log("Hackattic response: ", data);
}
