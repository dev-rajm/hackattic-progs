import express from 'express';
import jwt from 'jsonwebtoken';

import { getProblemJSON, submitSolution } from './packages/setup';

async function main() {
  const str = "";
  const jwt = await getProblemJSON();

  const app = express();

  app.post("/", (req, res) => {
    const token = req.body;
    res.send("Received post request at /");
  })

  app.listen(3000);
}

main();
