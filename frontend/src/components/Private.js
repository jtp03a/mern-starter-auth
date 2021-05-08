import React, { useEffect, useContext } from 'react';
import { AuthContext } from './../context/AuthContext';

function Private() {
  const authContext = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <p>
        Welcome{' '}
        {authContext.authState.userInfo.firstname +
          ' ' +
          authContext.authState.userInfo.lastname}
      </p>
      <p>You are logged in</p>
      <div>
        <button
          className="btn btn-sm btn-danger mt-1"
          onClick={authContext.logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Private;
