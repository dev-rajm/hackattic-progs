import { getProblemJSON } from "./utils";

async function main(): Promise<void> {
  const { ssh_key, username, repo_path, push_token } = await getProblemJSON();
  console.log(username);
}

main();
