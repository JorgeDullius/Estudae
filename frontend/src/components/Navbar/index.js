import MediaQuery from "react-responsive";
import React from "react";
import NavBarDesktop from "./Desktop";
import MobileAppBar from "./Mobile";
const NavBar = (props) => (
  <div>
    <MediaQuery maxWidth={779}>
      <MobileAppBar />
    </MediaQuery>
    <MediaQuery minWidth={780}>
      <NavBarDesktop backgroundColor={props.backgroundColor}/>
    </MediaQuery>
  </div>
);
export default NavBar;