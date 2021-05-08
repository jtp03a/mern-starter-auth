import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "./../context/AuthContext";
import { AxiosContext } from '../context/AxiosContext';

function Private() {
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const [privateData, setPrivateData] = useState();

  useEffect(() => {
    getPrivateData();
  }, []);

  const getPrivateData = async () => {
    try {
      const { data } = await axiosContext.authAxios.get("/private");
      setPrivateData(data);
    } catch (error) {
      setPrivateData('You are not authenticated')
    }
  };

  return (
    <div className="container mt-5">
      <p>
        Welcome{" "}
        {authContext.authState.userInfo.firstname +
          " " +
          authContext.authState.userInfo.lastname}
      </p>
      <p>{privateData}</p>
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
