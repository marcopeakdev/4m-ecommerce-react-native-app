import axios from 'axios';
import { Alert } from 'react-native';
import { BackendApi } from './backendApi';

const api = new BackendApi(
  process.env.BACKEND_API_TOAST_BASE
);

console.log('Toast API Object', api);

export const getRestaurants = () => {
  return axios
    .get(`${api.backendUrl}/restaurants`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(
        '### ...Error with Getting Toast Restaurants',
        {
          endpoint: `${api.backendUrl}/restaurants`,
          error
        }
      );
    });
};

export const getRestaurantInfo = () => {
  return axios
    .get(`${api.backendUrl}/restaurant/info/`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(
        '### Error with Get Toast Restaurant Info.',
        {
          endpoint: `${api.backendUrl}/restaurant/info/`,
          error
        }
      );
    });
};

//getSchedules

export const getSchedules = () => {
  return axios
    .get(
      `${api.backendUrl}/restaurant/schedules/`,
      api.config
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(
        '### Error with Get Toast Restaurant Schedules.',
        {
          endpoint: `${api.backendUrl}/restaurant/schedules/`,
          error
        }
      );
    });
};

// getMenus

export const getMenus = () => {
  return axios
    .get(`${api.backendUrl}/menus/`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Get Toast Menus.', {
        endpoint: `${api.backendUrl}/menus/`,
        error
      });
    });
};

// getTables

export const getTables = () => {
  return axios
    .get(`${api.backendUrl}/tables/`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Get Toast Tables', {
        endpoint: `${api.backendUrl}/tables/`,
        error
      });
    });
};

// getTables

export const getDiningOptions = () => {
  return axios
    .get(`${api.backendUrl}/diningOptions/`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(
        '### Error with Get Toast Dining Options',
        {
          endpoint: `${api.backendUrl}/diningOptions/`,
          error
        }
      );
    });
};

// getOrders

export const getOrders = async date => {
  const endpoint = date ? `${date}` : ``;
  return axios
    .get(`${api.backendUrl}/orders/${endpoint}`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Get orders.', {
        endpoint: `${api.backendUrl}/orders/${endpoint}`,
        error
      });
    });
};

// getOrder

export const getOrder = guid => {
  return axios
    .get(`${api.backendUrl}/order/${guid}`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Get Order.', {
        endpoint: `${api.backendUrl}/order/${guid}`,
        error
      });
    });
};

// getModifers

export const getModifers = async () => {
  return axios
    .get(
      `${api.backendUrl}/menu/modifiers/group`,
      api.config
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Get modifiers.', {
        endpoint: `${api.backendUrl}menu/modifiers/group`,
        error
      });
    });
};

// getModiferOptions

export const getModiferOptions = async () => {
  return axios
    .get(
      `${api.backendUrl}/menu/modifiers/option`,
      api.config
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Get modifiers options.', {
        endpoint: `${api.backendUrl}menu/modifiers/option`,
        error
      });
    });
};

// postOrder

export const postOrder = async data => {
  return axios
    .post(
      `${api.backendUrl}/order/`,
      data,
      api.getConfig('POST')
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(
        '### Error with Post Order.................',
        {
          endpoint: `${api.backendUrl}/order/`,
          error
        }
      );
    });
};

// updateOrderCheck

export const updateOrderCheck = async (
  oguid,
  cguid,
  data
) => {
  return axios
    .post(
      `${api.backendUrl}/orders/update/${oguid}/checks/${cguid}/selections`,
      data,
      api.getConfig('POST')
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Update Order Check', {
        endpoint: `${api.backendUrl}/orders/update/${oguid}/checks/${cguid}/selections`,
        error
      });
    });
};

// postPayment

export const postPayment = (oguid, cguid, data) => {
  console.log('Post Data', data);
  return axios
    .post(
      `${api.backendUrl}/orders/add/${oguid}/checks/${cguid}/payments`,
      data,
      api.getConfig('POST')
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Post Payment', {
        endpoint: `${api.backendUrl}/orders/add/${oguid}/checks/${cguid}/payments`,
        error
      });
    });
};
