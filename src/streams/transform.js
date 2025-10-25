import { stdin, stdout } from "process";
import { pipeline, Transform } from "stream";

const transform = async () => {
  stdout.write('Enter your text and then press Enter:\n');

  const textReverser = new Transform({
    transform(chunk, encoding, callback) {
      const str = chunk.toString().trim();
      const reversedStr = str.split('').reverse().join('');

      this.push(reversedStr + '\n');
      callback();
    }
  });

  pipeline(
    stdin,
    textReverser,
    stdout,
    (err) => {
      console.error(`Transform failed: ${err}`);
    }
  );
};

await transform();
