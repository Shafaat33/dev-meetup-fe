import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`,{
        emailId,
        password,
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate('/');
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };
  
  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`,{
        firstName,
        lastName,
        emailId,
        password,
      }, { withCredentials: true });
      dispatch(addUser(res.data?.user));
      navigate('/profile');
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center my-5'>
      <div className="card bg-base-300 w-120">
        <div className="card-body items-center text-center">
          <h1 className='text-xl my-5'>{isLoginForm ? 'Login' : 'SignUp'}</h1>
          {!isLoginForm && <>
            <label className="input validator mx-10">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                type="input"
                placeholder="jhon"
                required
              />
            </label>
            <label className="input validator mx-10">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                type="input"
                placeholder="khan"
                required
              />
            </label>
          </>}
          <label className="input validator mx-10">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              value={emailId}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="mail@site.com"
              required
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          <label className="input validator mx-10">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br/>At least one number <br/>At least one lowercase letter <br/>At least one uppercase letter
          </p>
          {error && <div className="text-red-500">{error}</div>}
          <div className="card-actions justify-end">
            <button
              className="btn btn-wide"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? 'Login' : 'SignUp'}
            </button>
          </div>
          <div
            onClick={() => setIsLoginForm((prevLogin) => !prevLogin)}
            className="my-5 cursor-pointer"
          >
            {isLoginForm ? 'New user? click here to signup' : 'Already have account? click here to login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
