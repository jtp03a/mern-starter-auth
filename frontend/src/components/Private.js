import React, { useEffect, useContext } from "react";
import { AuthContext } from "./../context/AuthContext";

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
      console.log(data)
    } catch (err) {
      console.log(err);
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
