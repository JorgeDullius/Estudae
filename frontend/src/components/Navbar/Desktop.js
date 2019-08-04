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
    backgroundColor: "#01579B",
  },
  loginButton: {
    backgroundColor: "#60C83C"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  }
  
}));
function NavBarDesktop() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar >
          <Typography variant="title" className={classes.title}>
            <img  src={logo} alt="" className={classes.title}/>
          </Typography>
          <Button color="inherit" className={classes.menuButton}>
            Home
          </Button>
          <Button color="inherit" className={classes.menuButton}>
            Consultar
          </Button>
          <Button color="inherit" className={classes.menuButton}>
            Praticar
          </Button>
          <Button color="inherit" className={classes.loginButton}>
            Sou professor
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBarDesktop;