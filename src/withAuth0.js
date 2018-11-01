import React from "react";
import Consumer from "./Consumer";

function withAuth0(Component) {
  return function(props) {
    return (
      <Consumer>{auth0 => <Component {...props} auth0={auth0} />}</Consumer>
    );
  };
}

export default withAuth0;
