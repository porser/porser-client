const env = (key: string, fallback: string): string =>
  process.env[key] || fallback;

export default env;
