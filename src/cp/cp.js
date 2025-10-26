import { spawn } from "child_process";
import { dirname, join } from "path";
import { stdin, stdout } from "process";
import { pipeline } from "stream";
import { fileURLToPath } from "url";

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const childPath = join(__dirname, 'files', 'script.js');

  const childProcess = spawn('node', [childPath, ...args]);

  pipeline(
    stdin,
    childProcess.stdin,
    (err) => {
      console.error(err.message);
    }
  );

  pipeline(
    childProcess.stdout,
    stdout,
    (err) => {
      console.error(err.message);
    }
  );
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3']);
