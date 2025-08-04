import axios from "axios";
import dotenv from "dotenv";
import { Jimp } from "jimp";
import QrCode from "qrcode-reader";

dotenv.config({ quiet: true, path: "../.env" });

(async () => {
  const { data } = await axios.get(
    `https://hackattic.com/challenges/reading_qr/problem?access_token=${process.env.TOKEN}`
  );
  console.log(data); // Problem JSON

  const response = await axios.get(data.image_url, {
    responseType: "arraybuffer",
  });

  const buffer = response.data; // Store the qr as buffer
  console.log(buffer);

  const image = await Jimp.read(buffer); // Reading image buffer

  const qr = new QrCode();
  qr.callback = async (err, value) => {
    if (err) {
      console.error(`Error while decoding qr: ${err}`);
      return;
    }
    console.log(`Decoded value: ${value.result}`);

    // Submit the solution JSON {code: xx-xxx-xx-xxx}
    const solve = await axios.post(
      `https://hackattic.com/challenges/reading_qr/solve?access_token=${process.env.TOKEN}`,
      { code: value.result }
    );
    console.log(solve.data); // Result
  };
  qr.decode(image.bitmap); // core decoding
})();
