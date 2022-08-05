import React, { useEffect } from "react";
import { Route, Switch, NavLink, BrowserRouter } from "react-router-dom";
import { Articles, TopStories, Search, NavBar } from "../../Components";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { connect, ConnectedProps } from "react-redux";
import { articles } from "../../Actions";

const MainPage: React.FC<PropsFromRedux> = ({
  searchArticleList,
}) => {

  useEffect(() => {
    searchArticleList && searchArticleList({text:'world'});
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h2"
          align="center"
        >
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <Search  />
                    <NavLink to="/topstories">
                      <Link component="button" variant="body2" data-testid='go-to-top-stories' >
                        Go to top stories
                      </Link>
                    </NavLink>
                    <Articles />
                  </>
                )}
              />
              <Route exact path="/topstories" render={() => (
              <>
                <TopStories />
              </>
            )} />
            </Switch>
          </BrowserRouter>
        </Typography>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
  };
};

const mapDispatchToProps = {
  searchArticleList: articles.searchArticle.get,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MainPage);
