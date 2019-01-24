import React from "react";
import Context from "./Context";

class Provider extends React.PureComponent {
  state = {
    webAuth: this.props.webAuth,
    authenticated: false,
    verifyAuthentication: () => {
      let expiresAt = Number(localStorage.getItem("expires_at"));

      return new Date().getTime() < expiresAt;
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
