import { writeFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const currentFile = `${__dirname}/files/fresh.txt`;

  try {
    await writeFile(currentFile, 'I am fresh and young', { flag: 'wx' });
    console.log('File created successfully');
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error('FS operation failed');
    }

    console.error(err.message);
  }
};

await create();
