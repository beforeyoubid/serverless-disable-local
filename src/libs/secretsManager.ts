import fs from 'fs';
import path from 'path';
const map = new Map();

export function readSecrets(): Record<string, string> {
  const regularFilePath = process.env.STAGE === 'local' ? '/app' : process.env.LAMBDA_TASK_ROOT ?? '/app';
  const filePath = process.env.FOR_MIGRATION === 'true' ? '' : regularFilePath;

  const secretsFilePath = path.join(filePath, 'secrets.json');
  if (!fs.existsSync(secretsFilePath)) {
    return {};
  }
  const file = fs.readFileSync(secretsFilePath, { encoding: 'utf-8' });
  const secrets = JSON.parse(file);
  return secrets;
}

function readSecret(key: string): Maybe<string> {
  const secretName = process.env.API_ENV_SECRET_NAME;
  if (!secretName) {
    throw new Error(`Env variable API_ENV_SECRET_NAME not defined`);
  }
  if (map.has(secretName)) {
    return map.get(secretName)[key];
  }
  try {
    const secrets = readSecrets()?.[secretName] ?? '{}';
    map.set(secretName, JSON.parse(secrets));
    return JSON.parse(secrets)?.[key];
  } catch (error) {
    console.log(`ERROR!: ${error}`);
  }
  return;
}

export default readSecret;
