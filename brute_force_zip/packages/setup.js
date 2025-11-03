import axios from "axios";
import { config } from "dotenv";

config({ quiet: true });

async function getProblemJSON() {
  const res = await axios.get(
    `https://hackattic.com/challenges/brute_force_zip/problem?access_token=${process.env.TOKEN}`,
  );

  const {zip_url} = res.data;
  const 
}
