import React from "react";
import Context from "./Context";

class Provider extends React.PureComponent {
  state = {
    webAuth: this.props.webAuth,
    authenticated: false,
    verifyAuthentication: () => {
      console.log("verify");
      let expiresAt = Number(localStorage.getItem("expires_at"));

      return new Date().getTime() < expiresAt;
    }
  };

  render() {
    console.log("authenticated", this.state.authenticated);
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
