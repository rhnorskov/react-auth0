import React from "react";
import Context from "./Context";

class Handler extends React.Component {
  static contextType = Context;

  state = {
    error: undefined,
    result: undefined
  };

  componentDidMount() {
    this.context.webAuth.parseHash((error = null, result = null) => {
      if (!error && result) {
        const { idToken, accessToken, expiresIn } = result;
        // localStorage.setItem("id_token", idToken);
        // localStorage.setItem("access_token", accessToken);
        // localStorage.setItem(
        //   "expires_at",
        //   new Date().getTime() + expiresIn * 1000
        // );

        // localStorage.setItem("id_token", idToken);
        // localStorage.setItem("access_token", accessToken);
        // localStorage.setItem(
        //   "expires_at",
        //   new Date().getTime() + expiresIn * 1000
        // );
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

export default Handler;
