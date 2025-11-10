import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { stdout } from 'process';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fileToRead = join(__dirname, 'files', 'fileToRead.txt');

  const readStream = createReadStream(fileToRead);
  readStream.on('data', chunk => {
    stdout.write(chunk + '\n');
  });
};

await read();
