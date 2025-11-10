import { cpus } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const workerPath = join(__dirname, 'worker.js');

  const cpuCores = cpus().length;
  const INIT_NUM = 10;
  const allPromises = [];

  for (let i = 0; i < cpuCores; i++) {
    const numForWorker = INIT_NUM + i;

    const workerPromise = new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, {
        workerData: numForWorker
      });

      worker.on('message', (workerResult) => {
        resolve(workerResult);
      });
      worker.on('error', (workerResult) => {
        reject(workerResult);
      });
    });

    allPromises.push(workerPromise);
  }

  const promiseResults = await Promise.allSettled(allPromises);
  const results = promiseResults.map((obj) => obj.value);
  console.log(results);
};

await performCalculations();
