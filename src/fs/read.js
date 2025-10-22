import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  try {
    const currentFile = await readFile(`${__dirname}/files/fileToRead.txt`, { encoding: 'utf-8' });
    console.log(currentFile);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }

};

await read();
