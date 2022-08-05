import React, { useEffect, useState } from "react";
import "./Register.css";
import { ILoginProps } from "../Login/Interfaces";
import { useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { articles } from "../../Actions";

const Register: React.FC<ILoginProps & PropsFromRedux> = ({ registerAccessToken, accessToken }) => {
  const [credentials, setCredentials] = useState({ firstName: '', lastName:'', email: "", password: "" });
  const { replace } = useHistory();

  async function registerUser(credentials: any) {
    registerAccessToken && registerAccessToken(credentials)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    registerUser(credentials);
    setTimeout(() => {
      replace({
        pathname: "/",
      });
    }, 10);
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
      <h1>Please Register</h1>
      <form onSubmit={handleSubmit} className="input-container">
        <label>
          <p>First Name</p>
          <input
            type="text"
            onChange={(e) =>
              setCredentials({ ...credentials, firstName: e.target.value })
            }
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            type="text"
            onChange={(e) =>
              setCredentials({ ...credentials, lastName: e.target.value })
            }
          />
        </label>
        <label>
          <p>Username</p>
          <input
            type="text"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </label>
        <div className="button-container">
          <button className="submit-btn" type="submit">Submit</button>
        </div>
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
  registerAccessToken: articles.registerAccessToken.get,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Register);