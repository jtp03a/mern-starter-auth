import './App.css';
import React, { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Private from './components/Private';
import Signup from './components/Signup'

const AuthenticatedRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  if (!authContext.isAuthenticated()) {
    return <Redirect to={'/'} />;
  }
  return children;
}

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <AuthenticatedRoute exact path='/private'>
          <Private />
        </AuthenticatedRoute>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AxiosProvider>
            <Routes />
        </AxiosProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
