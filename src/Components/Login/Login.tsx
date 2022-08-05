import React, { useState } from "react";
import "./Login.css";
import { ILoginProps } from "./Interfaces";
import Link from "@material-ui/core/Link";
import { connect, ConnectedProps } from "react-redux";
import { articles } from "../../Actions";

const Login: React.FC<ILoginProps & PropsFromRedux> = ({ getAccessToken, accessToken }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  async function loginUser(credentials: any) {
    getAccessToken && getAccessToken(credentials)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    loginUser(credentials);
      setTimeout(() => {
        accessToken == '' && setMessage('Incorrect email or password');
      }, 1000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
      <h1 className="">Please Log In</h1>
      <form onSubmit={handleSubmit} className="input-container">
        <label>
          <p>Username</p>
          <input
            type="text"
            required
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            required
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </label>
        {message != '' && <p className="error">{message}</p>}
        <div className="button-container">
          <button className="submit-btn" type="submit">Submit</button>
        </div>
        <Link className="button-container"  variant="body2" href='http://localhost:3002/register'>
          Create New Account
        </Link>
      </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    accessToken: state.article.accessToken
  };
};

const mapDispatchToProps = {
  getAccessToken: articles.getAccessToken.get,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Login);
