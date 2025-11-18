import { exec } from "node:child_process";
import { promisify } from "node:util";

const asyncExec = promisify(exec);

export async function createPasswordFile(
  username: string,
  password: string,
): Promise<void> {
  try {
    const { stdout, stderr } = await asyncExec(
      `htpasswd -bcB ${__dirname + "/./../../registry/registry.password"} ${username} ${password}`,
    );
    console.log("stdout: ", stdout);
    if (stderr) console.log("stderr: ", stderr);
  } catch (e) {
    console.log(e);
  }
}

export async function runCompose(): Promise<void> {
  try {
    const { stdout, stderr } = await asyncExec("docker compose up -d");
    console.log(stdout);
    if (stderr) console.log(stderr);
  } catch (e) {
    console.log(e);
  }
}

export async function stopCompose(): Promise<void> {
  try {
    const { stdout, stderr } = await asyncExec("docker compose stop");
    console.log(stdout);
    if (stderr) console.log(stderr);
  } catch (e) {
    console.log(e);
  }
}
