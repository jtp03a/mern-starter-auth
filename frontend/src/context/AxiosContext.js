import React, { createContext, useEffect } from 'react';
import axios from 'axios';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: '/api'
  });

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await authAxios.get('/csrf-token');
      authAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
    };

    getCsrfToken();
  }, []);

  return (
    <Provider
      value={{
        authAxios
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
