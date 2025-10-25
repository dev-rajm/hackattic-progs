import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import localtunnel from 'localtunnel';
import { getProblemJSON, submitSolution } from './packages/setup';

const app = express();
const PORT = 3000;

app.use(express.text({type: () => true}));

let result = '';
let jwt_secret = '';

app.post('/', (req, res) => {
  try {
    const token = req.body;
    console.log(token);
    const decoded = jwt.verify(token, jwt_secret);

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

app.listen(PORT, async () => {
  console.log('Server is listening on 3000');

  try {
    jwt_secret = await getProblemJSON();
    console.log('jwt secret: ', jwt_secret);

    const tunnel = await localtunnel({ port: PORT });
    const app_url = tunnel.url;
    console.log('app_url: ', app_url);

    await submitSolution(app_url);
  } catch (err: any) {
    console.log('Failed to start ngrok or submit solution: ', err.message);
  }
});
