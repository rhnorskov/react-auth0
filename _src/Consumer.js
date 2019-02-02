import React from "react";
import Context from "./Context";

class Consumer extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);

    this.api = {
      webAuth: this.props.context.webAuth,

      signUp: (email, password, options = {}) =>
        new Promise((resolve, reject) => {
          this.props.context.webAuth.signup(
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
        }),

      signIn: (email, password, options = {}) =>
        new Promise((resolve, reject) => {
          this.props.context.webAuth.login(
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
        }),

      signOut: () => {
        localStorage.removeItem("id_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
        this.props.context.verifyAuthentication();
      },

      authorize: (connection, options = {}) =>
        new Promise((resolve, reject) => {
          this.webAuth.login(
            {
              connection,
              ...options
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
        })
    };

    Object.defineProperty(this.api, "authenticated", {
      get: () => {
        return this.props.context.verifyAuthentication();
      }
    });
  }

  render() {
    return this.props.children(this.api);
  }
}

export default props => (
  <Context.Consumer>
    {context => <Consumer {...props} context={context} />}
  </Context.Consumer>
);
