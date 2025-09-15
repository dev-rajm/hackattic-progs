import axios from "axios";
import {config} from "dotenv";

config({quiet: true});

export async function getProblem() {
  const {data} = await axios.get(`https://hackattic.com/${process.env.PROBLEM_ENDPOINT}`);
  return data?.include;
}

export async function submitResult(file1: string, file2: string) {
  const payload = {files: [file1, file2]};
  const {data} = await axios.post(`https://hackattic.com/${process.env.SOLUTION_ENDPOINT}`, payload, {
    headers: {
      "Content-type": "application/json",
    }
  });
  console.log("Hackattic response: ", data);
}
