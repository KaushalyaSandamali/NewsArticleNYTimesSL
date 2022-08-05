import "./App.css";
import { MainPage, LoginPage, TopStories, Register } from "./Components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import { connect, ConnectedProps } from "react-redux";

const App: React.FC<any> = ({ history, accessToken }) => {
  if (!accessToken) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact key="/" path={"/"} render={() => <LoginPage />} />,
          <Route
            exact
            key="/register"
            path={"/register"}
            render={() => <Register />}
          />
          ,
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact key="/" path={"/"} render={() => <MainPage />} />,
          <Route
            exact
            path="/topstories"
            render={() => (
              <>
                <TopStories />
              </>
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    accessToken: state.article.accessToken,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
