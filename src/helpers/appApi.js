import axios from 'axios';
import {
  BACKEND_API_TOKEN,
  BACKEND_API_URL,
  PORT
} from '@env';

class AppApi {
  constructor() {
    /*     console.log(
      'APP_API_TOKEN............',
      BACKEND_API_TOKEN,
      BACKEND_API_URL,
      PORT
    ); */
    this.config = {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${BACKEND_API_TOKEN}`,

        'Content-Type': 'application/json'
      }
    };
    this.appUrl = `${BACKEND_API_URL}${
      PORT ? `:${PORT}` : ''
    }`;
  }

  getData() {
    return axios
      .get(`${this.appUrl}/app/data`, this.config)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(
          '### Error with App data retrieval....',
          {
            endpoint: `${this.appUrl}/app/data`,
            error: JSON.stringify(error)
          }
        );
      });
  }
}

export { AppApi };
