import axios from "axios";
import dotenv from "dotenv";
import { Jimp } from "jimp";
import QrCode from "qrcode-reader";

dotenv.config({ quiet: true, path: "../.env" });

// Extract image data from problem JSON
async function extractImageData() {
  try {
    const { data } = await axios.get(
      `https://hackattic.com/challenges/reading_qr/problem?access_token=${process.env.TOKEN}`
    );

    const response = await axios.get(data.image_url, {
      responseType: "arraybuffer",
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to extract image from problem data: ${error.message}`
    );
  }
}

// Extract code from qr
async function getCodeFromImage(buffer) {
  try {
    const image = await Jimp.read(buffer);
    const qr = new QrCode();

    qr.callback = (err, value) => {
      if (err) {
        console.error(`Error while decoding qr: ${err}`);
        return;
      }
      return value.result;
    };
    qr.decode(image.bitmap); // core decoding
  } catch (error) {
    throw new Error(`Failed to extract code from qr: ${error.message}`);
  }
}

// Submit solution
async function submitResult(result) {
  try {
    const { data } = await axios.post(
      `https://hackattic.com/challenges/reading_qr/solve?access_token=${process.env.TOKEN}`,
      result
    );
    console.log(`Hackattic response: ${data.message}`);
  } catch (error) {
    throw new Error(`Failed to submit solution: ${error.message}`);
  }
}

async function main() {
  const imageBuffer = await extractImageData();
  const code = await getCodeFromImage(imageBuffer);

  await submitResult({ code: code });
}

main();
