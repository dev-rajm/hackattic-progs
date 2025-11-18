import { getProblemJSON, triggerPush } from "./utils";
import { createPasswordFile, runCompose, stopCompose } from "./utils/utils";

async function main() {
  const res = await getProblemJSON();
  try {
    await createPasswordFile(res.credentials.user, res.credentials.password);
    const registry_host = await runCompose();
    console.log("Wait for the dns propagate...");
    await new Promise(res => setTimeout(res, 10000)); // wait for 8sec
    await triggerPush(res.trigger_token, registry_host);
  } catch (e) {
    console.log(e);
  } finally {
    await stopCompose();
  }
}

main();
