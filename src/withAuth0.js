import React from "react";
import Context from "./Context";

function withAuth0(Component) {
  return function(props) {
    return (
      <Context.Consumer>
        {auth0 => <Component {...props} auth0={auth0} />}
      </Context.Consumer>
    );
  };
}

export default withAuth0;
