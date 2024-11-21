import axios from 'axios';
import { BACKEND_API_SPREEDLY_BASE } from '@env';
import { BackendApi } from './backendApi';

const api = new BackendApi(
  BACKEND_API_SPREEDLY_BASE
);

// Create Credit Card
/* 
Data Format

payment_method: {
    credit_card: {
        first_name,
        last_name,
        number,
        month,
        year,
        verification_value
    },
    email
}
*/

export const postCreateCreditCard = data => {
  return axios
    .post(
      `${api.backendUrl}/ccard/create`,
      data,
      api.getConfig('POST')
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(
        '### Error with Post Create Credit Card',
        {
          endpoint: `${api.backendUrl}/ccard/create`,
          error
        }
      );
    });
};

export const postPaymentMethods = data => {
  return axios
    .post(
      `${api.backendUrl}/paymentmethods`,
      data,
      api.getConfig('POST')
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Post Payment Methods', {
        endpoint: `${api.backendUrl}/paymentmethods`,
        error
      });
    });
};

export const redactPaymentMethod = data => {
  return axios
    .post(
      `${api.backendUrl}/paymentmethod/redact`,
      data,
      api.getConfig('POST')
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Post Payment Methods', {
        endpoint: `${api.backendUrl}/paymentmethod/redact`,
        error
      });
    });
};
