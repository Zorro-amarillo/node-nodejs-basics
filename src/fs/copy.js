import { cp, access } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const currentFolder = `${__dirname}/files`;

  try {
    await access(currentFolder);
    await cp(currentFolder, `${currentFolder}_copy`, { recursive: true, force: false, errorOnExist: true });
    console.log('Folder copied successfully');
  } catch (err) {
    if (err.code === 'ERR_FS_CP_EEXIST' || err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    console.error(err.message);
  }
};

await copy();
