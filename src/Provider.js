import React from "react";
import PropTypes from "prop-types";
import Context from "./Context";
import { WebAuth } from "auth0-js";

class Provider extends React.Component {
  state = {
    accessToken: null,
    idToken: null,
    expiresAt: 0,

    setSession: result => {
      localStorage.setItem("authenticated", "true");

      this.setState({
        accessToken: result.accessToken,
        idToken: result.idToken,
        expiresAt: result.expiresIn * 1000 + new Date().getTime()
      });
    },

    clearSession: () => {
      localStorage.removeItem("authenticated");

      this.setState({
        accessToken: null,
        idToken: null,
        expiresAt: 0
      });
    },

    handleAuthentication: callback => {
      this.webAuth.parseHash((error, result) => {
        if (result && result.accessToken && result.idToken) {
          this.state.setSession(result);
        }

        callback && callback(error, result);
      });
    }
  };

  constructor(props) {
    super(props);

    this.webAuth = new WebAuth({
      ...this.props.config,
      responseType: "token id_token"
    });

    if (localStorage.getItem("authenticated") === "true") {
      this.renewSession();
    }
  }

  renewSession() {
    this.webAuth.checkSession({}, (error, result) => {
      if (result && result.accessToken && result.idToken) {
        this.state.setSession(result);
      }
    });
  }

  // static propTypes = {
  //   config: PropTypes.shape({
  //     domain: PropTypes.string.isRequired,
  //     clientID: PropTypes.string.isRequired,
  //     redirectUri: PropTypes.string.isRequired
  //   }).isRequired
  // };

  componentDidMount() {
    // console.log(localStorage.getItem("authenticated"));
  }

  render() {
    console.log(this.state);

    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
