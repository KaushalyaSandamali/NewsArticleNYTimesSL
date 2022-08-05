import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import decodeJWT from "jwt-decode";
import { connect, ConnectedProps } from "react-redux";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
interface IJWTToken {
  [key: string]: string;
}
const NavBar: React.FC<any> = ({accessToken}) => {
  const classes = useStyles();

  const decodedObj = decodeJWT<IJWTToken>(accessToken);
console.info('decodedObj',decodedObj)
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          New York Times Top Stories
        </Typography>
        <Typography>Login User : {decodedObj.email}</Typography>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: any) => {
  return {
    accessToken: state.article.accessToken
  };
};

const mapDispatchToProps = {
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NavBar);