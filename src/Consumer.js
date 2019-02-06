import React from "react";
import Context from "./Context";

class Consumer extends React.Component {
  static contextType = Context;

  signUp = (email, password, options = {}) =>
    new Promise((resolve, reject) => {
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

  signIn = (email, password, options = {}) =>
    new Promise((resolve, reject) => {
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

  signOut = () => {
    this.context.clearSession();
  };

  authorize = (connection, options = {}) =>
    new Promise((resolve, reject) => {
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

  render() {
    const api = {
      // signUp: this.signUp,
      // signIn: this.signIn,
      signOut: this.signOut
    };

    console.log("asd");

    // Object.defineProperty(api, "authenticated", {
    //   get: () => {
    //     return this.context.isAuthenticated();
    //   }
    // });

    return this.props.children(api);
  }
}

// export default props => (
//   <Context.Consumer>
//     {value => <Consumer {...props} value={value} />}
//   </Context.Consumer>
// );

export default Consumer;
