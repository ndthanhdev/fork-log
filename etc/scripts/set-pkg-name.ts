import jsonfile from "jsonfile";
import yargs from "yargs";

const path = `${process.cwd()}/package.json`;

async function main() {
  const argv = yargs.option("name", {
    type: "string",
    default: "fork-log",
  }).argv;

  const file = await jsonfile.readFile(path);
  await jsonfile.writeFile(
    path,
    { ...file, name: argv.name },
    { spaces: 2, EOL: "\n" }
  );
}

main();
