import fs from 'fs';
import readSecret, { readSecrets } from './secretsManager';

jest.mock('fs');

describe('readSecrets', () => {
  let stage: string | undefined;
  beforeEach(() => {
    stage = process.env.STAGE;
    process.env.STAGE = 'local';
  });
  afterEach(() => {
    jest.resetAllMocks();
    process.env.STAGE = stage;
  });
  it('should check if the file exists', () => {
    const out = readSecrets();
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(out).toStrictEqual({});
  });
  it('shouldnt try to load the file if the file does not exist', () => {
    const out = readSecrets();
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledTimes(0);
    expect(out).toStrictEqual({});
  });
  it('should load the file if the file does exist', () => {
    const value = Math.random().toString();
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ value }));
    const out = readSecrets();
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(out).toStrictEqual({ value });
  });
});

describe('readSecrets', () => {
  const original = console.log;

  beforeEach(() => {
    process.env.API_ENV_SECRET_NAME = Math.random().toString();
    console.log = jest.fn().mockImplementation((...args) => original(...args));
  });
  afterEach(() => {
    jest.resetAllMocks();
    console.log = original;
  });
  it('should throw error if env secret name not defined', () => {
    delete process.env.API_ENV_SECRET_NAME;
    expect(() => readSecret('some key')).toThrow(Error);
  });
  it('should return value from secrets', () => {
    const value = Math.random().toString();
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({ [process.env.API_ENV_SECRET_NAME as string]: JSON.stringify({ value }) })
    );
    const out = readSecret('value');
    expect(out).toBe(value);
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  });
  it('should return from map if already parsed', () => {
    const value = Math.random().toString();
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({ [process.env.API_ENV_SECRET_NAME as string]: JSON.stringify({ value }) })
    );
    const out = readSecret('value');
    expect(out).toBe(value);
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    const outSecond = readSecret('value');
    expect(outSecond).toBe(value);
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  });
  it('shouldnt be able to return from map if not in map', () => {
    const value = Math.random().toString();
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({ [process.env.API_ENV_SECRET_NAME as string]: JSON.stringify({ value }) })
    );
    const out = readSecret('value');
    expect(out).toBe(value);
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    process.env.API_ENV_SECRET_NAME = Math.random().toString();
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({ [process.env.API_ENV_SECRET_NAME as string]: JSON.stringify({ value }) })
    );
    const outSecond = readSecret('value');
    expect(outSecond).toBe(value);
    expect(fs.existsSync).toHaveBeenCalledTimes(2);
    expect(fs.readFileSync).toHaveBeenCalledTimes(2);
  });
  it('should log an error to console if not able to parse', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({ [process.env.API_ENV_SECRET_NAME as string]: '{' })
    );
    const out = readSecret('value');
    expect(out).toBe(undefined);
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/ERROR/));
  });
});
