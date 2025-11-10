import { createReadStream, createWriteStream } from "fs";
import { access, stat, unlink } from "fs/promises";
import { dirname, join } from "path";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import { createGzip } from "zlib";

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const sourceFile = join(__dirname, 'files', 'fileToCompress.txt');
  const archivedFile = join(__dirname, 'files', 'archive.gz');

  try {
    const readStream = createReadStream(sourceFile);
    const writeStream = createWriteStream(archivedFile);
    const gzip = createGzip();

    await pipeline(readStream, gzip, writeStream);
    console.log('File compressed successfully');
  } catch (err) {
    console.error(`Compression failed:\n${err.message}`);

    try {
      const stats = await stat(archivedFile);

      if (stats.size === 0) {
        await access(archivedFile);
        await unlink(archivedFile);
        console.log('Empty archive.gz deleted');
      }
    } catch (err) {
      console.error(`Compression ended with error:\n${err.message}`);
    }
  }
};

await compress();
