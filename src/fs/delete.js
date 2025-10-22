import { access, unlink } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const currentFile = `${__dirname}/files/fileToRemove.txt`;

  try {
    await access(currentFile);
    await unlink(currentFile);
    console.log('File deleted successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }
};

await remove();
