import React, { useState, useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import { Redirect, Link } from 'react-router-dom';
import { AxiosContext } from '../context/AxiosContext';

function Signup() {
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [input, setInput] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input.password === input.confpassword) {
      try {
        const { data } = await axiosContext.authAxios.post(`auth/signup`, input);
        authContext.setAuthState(data);
        setLoading(false);
        setLoginRedirect(true);
      } catch (error) {
        setLoading(false);
        const { data } = error.response;
        setErrorMessage(data.message);
      }
    } else {
      setErrorMessage('Your passwords dont match');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });

    if (name === 'password' || name === 'confpassword') {
      const password = document.getElementById('password');
      const confpassword = document.getElementById('confpassword');
      if (password.value !== confpassword.value) {
        setErrorMessage('Your passwords dont match');
      } else {
        setErrorMessage('');
      }
    }
  };

  return (
    <div className="h-100 d-flex align-items-center justify-content-center mt-5">
      {loginRedirect && <Redirect to="/private" />}
      <form onSubmit={submitCredentials}>
        <div className="card">
          <div className="card-header" id="signin-card-header">
            <h3>Sign Up</h3>
          </div>
          <div className="card-body" id="signin-card-body">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                id="signin-spinner"
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
                    pattern="[a-z,0-9]{5,25}"
                    title="Username should only contain lowercase letters or numbers and be between 5 and 25 characters"
                  />
                </div>
                <div className="input group form-group">
                  <label htmlFor="firstname">First Name: </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={input.firstname}
                    onChange={handleInputChange}
                    className="form-control"
                    pattern="[a-z,A-Z]{1,50}"
                    title="First name should contain lowercase or uppercase letters"
                    required
                  />
                </div>
                <div className="input group form-group">
                  <label htmlFor="lastname">Last Name: </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={input.lastname}
                    onChange={handleInputChange}
                    className="form-control"
                    pattern="[a-z,A-Z]{1,50}"
                    title="Last name should contain lowercase or uppercase letters"
                    required
                  />
                </div>
                <div className="input group form-group">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={input.email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password: </label>
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
                  <label htmlFor="confpassword">Confirm Password: </label>
                  <input
                    type="password"
                    name="confpassword"
                    id="confpassword"
                    value={input.confpassword}
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
                      Already Registered? Sign in <Link to={'/'}>here</Link>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
