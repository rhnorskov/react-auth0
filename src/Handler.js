import React from "react";
import Context from "./Context";

class Handler extends React.Component {
  static contextType = Context;

  state = {
    error: undefined,
    result: undefined
  };

  componentDidMount() {
    this.context.handleAuthentication((error = null, result = null) => {
      this.setState({ error, result });
    });
  }

  render() {
    const { error, result } = this.state;

    if (error !== undefined && result !== undefined) {
      return this.props.children(error, result);
    }

    return null;
  }
}

export default Handler;
