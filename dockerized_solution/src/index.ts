import { getProblemJSON, triggerPush } from "./utils";
import { createPasswordFile, runCompose, stopCompose } from "./utils/utils";
import localtunnel from "localtunnel";

async function main() {
  const res = await getProblemJSON();
  try {
    await createPasswordFile(res.credentials.user, res.credentials.password);
    await runCompose();
    const registry_host = await localtunnel({ port: 5000 });
    console.log("registry_host: ", registry_host.url.split("//")[1]);
    await triggerPush(res.trigger_token, registry_host.url.split("//")[1]);
  } catch (e) {
    console.log(e);
  } finally {
    await stopCompose();
  }
}

main();
