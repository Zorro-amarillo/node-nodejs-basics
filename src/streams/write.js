import { createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { stdin, stdout } from 'process';
import { fileURLToPath } from 'url';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fileToWrite = join(__dirname, 'files', 'fileToWrite.txt');

  stdout.write('Enter your text and then press Enter:\n');
  const writeStream = createWriteStream(fileToWrite);
  stdin.pipe(writeStream);
};

await write();
