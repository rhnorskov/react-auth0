import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider as Auth0, Consumer, Handler } from "../../src";
import config from "../../auth0_config.json";

const Demo = () => (
  <Switch>
    <Route path="/callback" component={Callback} />
  </Switch>
);
{
  /* <Consumer>
    {auth => {
      return (
        <div>
          <button onClick={() => auth.signOut()}>Sign out</button>
        </div>
      );
    }}
  </Consumer> */
}
const Callback = () => (
  <Handler>
    {(error, result) => {
      console.log("asd");
      return null;
    }}
  </Handler>
);

render(
  <Router>
    <Auth0 config={config}>
      <Demo />
    </Auth0>
  </Router>,
  document.querySelector("#demo")
);
