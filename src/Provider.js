import React from "react";
import PropTypes from "prop-types";
import Context from "./Context";
import Auth from "./Auth";

class Provider extends React.Component {
  state = {
    value: new Auth(this.props.config)
  };

  static propTypes = {
    config: PropTypes.shape({
      domain: PropTypes.string.isRequired,
      clientID: PropTypes.string.isRequired,
      redirectUri: PropTypes.string.isRequired
    }).isRequired
  };

  componentDidMount() {
    if (localStorage.getItem("authenticated") === "true") {
      this.state.value.renewSession();
    }
  }

  render() {
    return (
      <Context.Provider value={this.state.value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
