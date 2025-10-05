import http from "http";
import { URL } from "url";

export function startServer() {
  const server = http.createServer((req, res) => {
    const {method} = req;

    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.setHeader("Access-Controll-Allow-Methods", "POST");
    res.setHeader("Access-Controll-Allow-Headers", "Content-Type");

    let body = "";
    if(method === "POST") {
      req.on("data", () => {
        if(req.body.append)
          body += req.body.append;
      })
    }
  })
}
