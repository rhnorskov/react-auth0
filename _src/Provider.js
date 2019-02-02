import React from "react";
import Context from "./Context";
import Auth from "./Auth";

class Provider extends React.PureComponent {
  state = {
    auth: new Auth(this.props.options)
    // authenticated: false,
    // verifyAuthentication: () => {
    //   let expiresAt = Number(localStorage.getItem("expires_at"));
    //   return new Date().getTime() < expiresAt;
    // }
  };

  render() {
    console.log(this.props);

    return (
      <Context.Provider value={this.state}>
        {/* {this.props.children} */}
      </Context.Provider>
    );
  }
}

export default Provider;
