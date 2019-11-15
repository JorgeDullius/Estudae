import React from "react";
import { BrowserRouter, Route, Switch, Redirect  } from "react-router-dom";
import Home from './pages/Home/index';
import Signup from './pages/Signup/index';
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/signup">
            <Signup />
        </Route>
        <PrivateRoute path="/logado" component={() => <h1>Logado</h1>} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
)
export default Routes;