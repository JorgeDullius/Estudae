import MediaQuery from "react-responsive";
import React from "react";
import NavBarDesktop from "./Desktop";
import MobileAppBar from "./Mobile";
const NavBar = () => (
  <div>
    <MediaQuery maxWidth={779}>
      <MobileAppBar />
    </MediaQuery>
    <MediaQuery minWidth={780}>
      <NavBarDesktop />
    </MediaQuery>
  </div>
);
export default NavBar;