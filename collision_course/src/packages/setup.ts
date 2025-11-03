import axios from "axios";
import {config} from "dotenv";

config({quiet: true, path:"../../../.env"});

export async function getProblem() {
  const {data} = await axios.get(`https://hackattic.com/challenges/collision_course/problem?access_token=${process.env.TOKEN}`);
  return data?.include;
}

export async function submitResult(file1: string, file2: string) {
  const payload = {files: [file1, file2]};
  const {data} = await axios.post(`https://hackattic.com/challenges/collision_course/solve?access_token${process.env.TOKEN}`, payload, {
    headers: {
      "Content-type": "application/json",
    }
  });
  console.log("Hackattic response: ", data);
}
