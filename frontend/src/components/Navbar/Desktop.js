import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import logo from '../../assets/logo.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: props => props.backgroundColor,
    boxShadow: 'none',
    zIndex:1201
  },
  loginButton: {
    color: 'white',
    backgroundColor: 'rgb(45, 228, 115)',
    '&:hover': {
      backgroundColor: "#00B2FF;",
    },
    textTransform: "none",
    marginRight: theme.spacing(12),
    fontFamily: 'Lato',
    fontWeight:'bold',
    fontSize: '20px',
    lineHeight: '1.5',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    textTransform: "none",
    fontFamily: 'Lato',
    fontWeight:'bold',
    fontSize: '20px',
    lineHeight: '1.5',
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(1)
  }
}));
function NavBarDesktop(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar >
          <Typography className={classes.title}>
            <img  src={logo} alt="" />
          </Typography>
          <Button color="inherit" className={classes.menuButton}>
            Consultar
          </Button>
          <Button color="inherit" className={classes.menuButton}>
            Praticar
          </Button>
          <Button href="http://localhost:3000/signup" color="inherit" className={classes.loginButton}>
            Sou professor (a)
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBarDesktop;