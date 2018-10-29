import React from "react";
import { WebAuth } from "auth0-js";
import Context from "./Context";
import Auth0 from "./Auth0";

class Provider extends React.Component {
  state = {
    value: {
      webAuth: this.props.webAuth,
      isAuthenticated: Auth0.isAuthenticated(),
      verifyAuthentication: () => {
        const isAuthenticated = Auth0.isAuthenticated();

        if (isAuthenticated !== this.state.value.isAuthenticated) {
          this.setState({
            value: {
              ...this.state.value,
              isAuthenticated
            }
          });
        }

        return isAuthenticated;
      }
    }
  };

  render() {
    const { children } = this.props;
    const { isAuthenticated } = this.state;

    return (
      <Context.Provider value={this.state.value}>{children}</Context.Provider>
    );
  }
}

export default Provider;
