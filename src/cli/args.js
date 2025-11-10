import { argv, stdout } from 'process';

const parseArgs = () => {
  const args = argv.slice(2);

  const result = args.reduce((acc, value, index) => {
    if ((index % 2 === 0) && value.startsWith('--')) {
      return `${acc}${value.slice(2)} is `;
    }

    if (index === args.length - 1) {
      return `${acc}${value}`;
    }

    return `${acc}${value}, `;
  }, '');

  stdout.write(result + '\n');
};

parseArgs();
