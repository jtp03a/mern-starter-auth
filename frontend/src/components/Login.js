import React, { useState, useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import { Redirect, Link } from 'react-router-dom';
import { AxiosContext } from '../context/AxiosContext';

function Login() {
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [input, setInput] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosContext.authAxios.post(`auth/login`, input);
      authContext.setAuthState(data);
      setLoading(false);
      setLoginRedirect(true);
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      setErrorMessage(data.message);
      if (data.passwordstatus) {
        // const modal = document.getElementById('exampleModal')
        // modal.show()
        const passwordprompt = prompt('Enter a new password');
        if (passwordprompt === null || passwordprompt === '') {
          console.log('You didnt enter anything');
        } else {
          input.newpass = passwordprompt;
          const { data } = await axiosContext.authAxios.post(
            `auth/changepassword`,
            input
          );
          setErrorMessage(data.message);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div className="h-100 d-flex justify-content-center mt-5">
      {loginRedirect && <Redirect to="/private" />}
      <form className="h-100" onSubmit={submitCredentials}>
        <div className="card">
          <div className="card-header" id="login-card-header">
            <h3>Sign In</h3>
          </div>
          <div className="card-body" id="login-card-body">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                id="login-spinner"
              >
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            ) : (
              <>
                <div className="input group form-group">
                  <label htmlFor="username">Username: </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={input.username}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    pattern="[a-z,0-9]{1,15}"
                    title="Username should only contain lowercase letters or numbers and be between 5 and 15 characters"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Password: </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={input.password}
                    onChange={handleInputChange}
                    className="form-control"
                    pattern="^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^\w\s]).{8,20}$"
                    title="Password must contain atleast 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character and be 8-20 characters in length"
                    required
                  />
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary mt-2">
                      Submit
                    </button>
                  </div>
                  <div className="mt-2 alerttext">{errorMessage}</div>
                  <div>
                    <p>
                      Not Registered? Sign up <Link to={'/signup'}>here</Link>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Login;
