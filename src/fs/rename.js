import { access, rename as renameFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const currentFile = join(__dirname, 'files', 'wrongFilename.txt');
  const changedFile = join(__dirname, 'files', 'properFilename.md');
  const errMessage = 'FS operation failed';

  try {
    await access(currentFile);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(errMessage);
    }
  }

  try {
    await access(changedFile);
    throw new Error(errMessage);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await renameFile(currentFile, changedFile);
      console.log('File renamed successfully');
    }

    if (err.message === errMessage) {
      throw err;
    }
  }
};

await rename();
