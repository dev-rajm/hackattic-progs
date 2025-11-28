import { getProblemJSON, submitSolution } from "./utils";
import WebSocket from "ws";

let ws: WebSocket;

async function main(): Promise<void> {
  const { token } = await getProblemJSON();
  try {
    ws = new WebSocket(`wss://hackattic.com/_/ws/${token}`);
    // on error
    ws.on("error", console.error);

    // on connect to server
    ws.on("open", () => {
      const time = Date.now();
      ws.on("message", (message: ArrayBuffer) => {
        const millisecond = time - Date.now();
        const utfMessage = Buffer.from(message).toString("utf8");
        console.log("recived message: ", utfMessage);
        if (utfMessage.startsWith("ping!")) {
          console.log("sending: ", millisecond);
          ws.send(millisecond);
        } else if (utfMessage.startsWith("ouch!")) {
          console.log("Disconnect from server");
          ws.close();
        } else {
          console.log(message);
        }
      });
    });

    // on closing socket
    ws.on("close", () => {
      console.log("Disconnected from server");
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

main();
