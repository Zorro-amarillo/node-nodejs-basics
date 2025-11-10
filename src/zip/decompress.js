import { createReadStream, createWriteStream } from "fs";
import { access, stat, unlink } from "fs/promises";
import { dirname, join } from 'path';
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import { createGunzip } from 'zlib';

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const archivedFile = join(__dirname, 'files', 'archive.gz');
  const decompressedFile = join(__dirname, 'files', 'fileToCompress.txt');

  try {
    const readStream = createReadStream(archivedFile);
    const writeStream = createWriteStream(decompressedFile);
    const gunzip = createGunzip();

    await pipeline(readStream, gunzip, writeStream);
    console.log('File decompressed successfully');
  } catch (err) {
    console.error(`Decompression failed:\n${err.message}`);

    try {
      const stats = await stat(decompressedFile);

      if (stats.size === 0) {
        await access(decompressedFile);
        await unlink(decompressedFile);
        console.log('Empty fileToCompress.txt deleted');
      }
    } catch (err) {
      console.error(`Decompression ended with error:\n${err.message}`);
    }
  }
};

await decompress();
