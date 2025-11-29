import { getProblemJSON, submitSolution } from "./utils";
import WebSocket from "ws";

async function main(): Promise<void> {
  const { token } = await getProblemJSON();
  const ws = new WebSocket(`wss://hackattic.com/_/ws/${token}`);

  const intervals = [700, 1500, 2000, 2500, 3000];

  let connectionOpenAt = 0;
  let lastPing = 0;

  ws.on("open", () => {
    connectionOpenAt = Date.now();
    console.log("Connection opened at: ", connectionOpenAt);
  });

  ws.on("message", async (msg: Buffer) => {
    const text = msg.toString();
    console.log("received: ", text);

    if (text.startsWith("ping!")) {
      const now = Date.now();
      let delta;

      if (lastPing === 0) {
        // first ping!
        delta = now - connectionOpenAt;
      } else {
        // subsequent pings
        delta = now - lastPing;
      }

      const chosen = intervals.reduce((prev: number, curr: number) => {
        return Math.abs(curr - delta) < Math.abs(prev - delta) ? curr : prev;
      });

      ws.send(String(chosen));

      lastPing = now;
    }

    if (text.startsWith("ouch!")) {
      console.log("server closed: ", text);
      ws.close();
    }

    if (text.startsWith("congratulations!")) {
      const secret = text.match(/"([^"]*)"/);
      if (secret) {
        console.log("secret found: ", secret[1]);
        await submitSolution(secret[1]);
        ws.close();
      }
    }
  });

  ws.on("close", () => console.log("Disconnected"));
}

main();
