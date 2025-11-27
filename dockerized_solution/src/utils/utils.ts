import { exec } from "node:child_process";
import { promisify } from "node:util";

const asyncExec = promisify(exec);

export async function createPasswordFile(
  username: string,
  password: string,
): Promise<void> {
  try {
    const { stdout } = await asyncExec(
      `htpasswd -bcB ${__dirname + "/./../../registry/registry.password"} ${username} ${password}`,
    );
    console.log("stdout: ", stdout);
  } catch (e) {
    console.log(e);
  }
}

export async function runCompose(): Promise<string> {
  try {
    await asyncExec("docker compose up -d cloudflared");

    const { stdout } = await asyncExec(
      "docker compose logs --no-log-prefix --tail=50 cloudflared",
    );
    console.log(stdout);

    const match = stdout.match(/https:\/\/.*?\.trycloudflare\.com/);
    if (!match) throw new Error("Cloudflare URL not found");

    // catch registry_host from url
    const cfURL = match[0];
    const registry_host = cfURL.replace("https://", "");
    console.log("registry_host: ", registry_host);

    return registry_host;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function stopCompose(): Promise<void> {
  try {
    const { stdout } = await asyncExec("docker compose stop");
    console.log(stdout);
  } catch (e) {
    console.log(e);
  }
}
