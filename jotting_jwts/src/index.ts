import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ngrok from 'ngrok';
import { config } from 'dotenv';
import { getProblemJSON, submitSolution } from './packages/setup';

config({quiet: true});

const app = express();
app.use(express.text()); // accept JWT raw string

let result = '';
let app_url = '';
let jwt_secret = '';

app.post('/', (req, res) => {
  try {
    const token = req.body.trim();
    const decoded = jwt.verify(token, jwt_secret);
    console.log(decoded);

    if (typeof decoded === 'string') {
      console.log('Decoded payload is string, expected object');
      return res.status(400).send('Invalid payload');
    }

    const payload = decoded as JwtPayload;
    if (!payload.append) {
      console.log('No append key detected. Sending final result...');
      return res.json({ solution: result });
    }

    result += payload.append;
    console.log('Appended: ', payload.append);
    res.send('ok');
  } catch (err: any) {
    console.log('JWT verification error: ', err.message);
    res.status(401).send('Invalid token');
  }
});

app.listen(3000, async () => {
  console.log('Server is listening on 3000');

  try {
    jwt_secret = await getProblemJSON();
    console.log('jwt secret: ', jwt_secret);

    app_url = await ngrok.connect({
      addr: 3000,
      authtoken: process.env.NGROK_AUTH_TOKEN,
    });
    console.log('app_url: ', app_url);

    await submitSolution(app_url);
  } catch (err: any) {
    console.log('Failed to start ngrok or submit solution: ', err.message);
  }
});
