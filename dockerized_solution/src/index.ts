import { getProblemJSON, submitSolution, triggerPush } from "./utils";
import {
  createPasswordFile,
  runCompose,
  runContainer,
  stopCompose,
} from "./utils/utils";

async function main() {
  const res = await getProblemJSON();
  try {
    await createPasswordFile(res.credentials.user, res.credentials.password);
    const registry_host = await runCompose();
    console.log(res.trigger_token);
    // waiting for the dns setup
    new Promise((res) => setTimeout(res, 8000));
    const tags = await triggerPush(res.trigger_token, registry_host);
    const secret = await runContainer(
      registry_host,
      res.credentials.user,
      res.credentials.password,
      res.ignition_key,
      tags
    );
    await submitSolution(secret);
  } catch (e) {
    console.log(e);
  } finally {
    await stopCompose();
  }
}

main();
