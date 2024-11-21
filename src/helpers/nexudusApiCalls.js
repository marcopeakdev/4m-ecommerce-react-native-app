import axios from 'axios';
import { BACKEND_API_NEXUDUS_BASE } from '@env';
import { BackendApi } from './backendApi';

const api = new BackendApi(
  BACKEND_API_NEXUDUS_BASE
);

console.log('Nexudus..', process.env.BACKEND_API_NEXUDUS_BASE);

export const getPublicEvents = () => {
  return axios
    .get(`${api.backendUrl}/events/public`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Public Events....', {
        endpoint: `${api.backendUrl}/events/public`,
        error
      });
    });
};

export const getResources = () => {
  return axios
    .get(`${api.backendUrl}/resources`, api.config)
    .then(response => {
      return response.data.Records;
    })
    .catch(error => {
      console.log('### Error with Resources....', {
        endpoint: `${api.backendUrl}/resources`,
        error
      });
    });
};

export const getPlans = () => {
  return axios
    .get(`${api.backendUrl}/plans`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Resources....', {
        endpoint: `${api.backendUrl}/plans`,
        error
      });
    });
};
