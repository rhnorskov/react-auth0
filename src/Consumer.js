import React from "react";
import Auth0 from "./Auth0";

import Context from "./Context";

class Consumer extends React.Component {
  static contextType = Context;

  signUp = (email, password, options = {}) => {
    return new Promise((resolve, reject) => {
      this.context.webAuth.signup(
        {
          email,
          password,
          connection: "Username-Password-Authentication",
          ...options
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  };

  signIn = (email, password, options = {}) => {
    return new Promise((resolve, reject) => {
      this.context.webAuth.login(
        {
          email,
          password,
          realm: "Username-Password-Authentication",
          ...options
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  };

  signOut = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    this.context.verifyAuthentication();
  };

  authorize = (connection, options = {}) => {
    return new Promise((resolve, reject) => {
      this.context.webAuth.login(
        {
          connection,
          ...options
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  };

  render() {
    const api = {
      signUp: this.signUp,
      signIn: this.signIn,
      signOut: this.signOut,
      authorize: this.authorize
    };

    Object.defineProperty(api, "isAuthenticated", {
      get: () => {
        return this.context.verifyAuthentication();
      }
    });

    return this.props.children(api);
  }
}

export default Consumer;
