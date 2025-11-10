import { readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filesPath = join(__dirname, 'files');

  try {
    const files = await readdir(filesPath);
    console.log(files);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    console.error(err.message);
  }
};

await list();
