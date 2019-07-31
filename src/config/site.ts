const API_VERSION = String(process.env.API_VERSION) || 'v1';
const API_DOMAIN = String(process.env.API_DOMAIN) || 'http://localhost';
const PORT = Number(process.env.PORT) || 3000;

export default {
  API_VERSION,
  API_DOMAIN,
  PORT,
  BASE_PATH: `${API_DOMAIN}${PORT ? ':'+PORT : ''}/${API_VERSION}/`,
}
