import { env, exit, stderr, stdout } from 'process';

const parseEnv = () => {
  const envVars = Object.entries(env)
    .filter(arr => arr[0].startsWith('RSS_'));

  if (envVars.length === 0) {
    stderr.write('No RSS_ environment variables found\n');
    exit();
  }

  const rssVars = envVars.map(arr => {
    const [ key, value ] = arr;
      return `${key}=${value}`;
    })
    .join('; ');

  stdout.write(rssVars + '\n');
  exit();
};

parseEnv();
