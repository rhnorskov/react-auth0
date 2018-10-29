import React from "react";
import Auth0 from "./Auth0";
import Context from "./Context";

class Callback extends React.Component {
  static contextType = Context;

  state = {
    error: undefined,
    result: undefined
  };

  componentDidMount() {
    this.context.webAuth.parseHash((error = null, result = null) => {
      if (!error && result) {
        const { idToken, accessToken, expiresIn } = result;
        Auth0.setSession(idToken, accessToken, expiresIn);
        this.context.verifyAuthentication();
      }

      this.setState({ error, result });
    });
  }

  render() {
    const { children } = this.props;
    const { error, result } = this.state;

    if (error !== undefined && result !== undefined) {
      return children(error, result);
    }

    return null;
  }
}

export default Callback;
