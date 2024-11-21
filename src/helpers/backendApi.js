import {
  BACKEND_API_TOKEN,
  BACKEND_API_URL,
  PORT
} from '@env';

class BackendApi {
  constructor(service) {
    console.log(
      'BACKEND_API_TOKEN.............................',
      BACKEND_API_TOKEN,
      BACKEND_API_URL,
      PORT,
      service
    );
    this.config = {
      headers: {
        Authorization: `Bearer ${BACKEND_API_TOKEN}`,
        method: 'GET',
        'Content-Type': 'application/json'
      }
    };
    this.backendUrl = `${BACKEND_API_URL}${
      PORT ? `:${PORT}` : ''
    }/${service}`;
  }
  getConfig(method = 'GET') {
    return {
      ...this.config,
      headers: { ...this.config.headers, method }
    };
  }
}

export { BackendApi };
