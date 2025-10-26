import { createHash } from "crypto";
import { createReadStream } from "fs";
import { dirname, join } from "path";
import { stdout } from "process";
import { fileURLToPath } from "url";

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const readStream = createReadStream(filePath);
  const hash = createHash('sha256');
  readStream.pipe(hash).setEncoding('hex').pipe(stdout);

  hash.on('end', () => stdout.write('\n'));
};

await calculateHash();
