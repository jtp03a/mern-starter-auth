import React, { useState, createContext } from 'react';
import { useHistory} from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const userInfo = localStorage.getItem('userInfo');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  
  const [ authState, setAuthState] = useState({
    token: null,
    tokenExpiration,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  const setAuthInfo = ({ token, userInfo, tokenExpiration }) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('tokenExpiration', tokenExpiration);
    
    setAuthState({
      token,
      userInfo,
      tokenExpiration
    })
  }

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('tokenExpiration');

    setAuthState({
      token: null,
      userInfo: {},
      tokenExpiration: null
    })

    history.push('/');
  }

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  }


  const isAuthenticated = () => {
    if (!authState.tokenExpiration) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.tokenExpiration
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        isAuthenticated,
        logout,
        isAdmin
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
