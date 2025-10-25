import { createReadStream } from 'fs';
import { dirname } from 'path';
import { stdout } from 'process';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const readStream = createReadStream(`${__dirname}/files/fileToRead.txt`);
  readStream.on('data', chunk => {
    stdout.write(chunk + '\n');
  });
};

await read();
