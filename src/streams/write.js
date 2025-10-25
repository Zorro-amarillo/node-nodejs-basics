import { createWriteStream } from 'fs';
import { dirname } from 'path';
import { stdin, stdout } from 'process';
import { fileURLToPath } from 'url';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  stdout.write('Enter your text and then press Enter:\n');
  const writeStream = createWriteStream(`${__dirname}/files/fileToWrite.txt`);
  stdin.pipe(writeStream);
};

await write();
