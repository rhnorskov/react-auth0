import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { Formik, Form, Field } from "formik";
import auth0 from "auth0-js";
import { Provider as Auth0, Consumer, Handler } from "../../src";

const webAuth = new auth0.WebAuth({
  domain: "rhnorskov.eu.auth0.com",
  clientID: "WDhMo3ho4scpQtLT6q6qg0BCwaM0nmR_",
  redirectUri: "https://localhost:3000/callback",
  responseType: "token"
});

const Demo = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/account" component={Account} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signout" component={SignOut} />
    <Route
      path="/callback"
      render={({ location: { state } }) => (
        <Handler>
          {(error, result) => {
            if (error) return <Redirect to="/signin" />;
            if (
              typeof state !== "undefined" &&
              state.hasOwnProperty("referrer")
            )
              return <Redirect to={state.referrer} />;

            return <Redirect to="/account" />;
          }}
        </Handler>
      )}
    />
  </Switch>
);

const Navigation = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/account">Account</Link>
    </li>
    <li>
      <Link to="/signup">Sign up</Link>
    </li>
    <li>
      <Link to="/signin">Sign in</Link>
    </li>
    <li>
      <Link to="/signout">Sign out</Link>
    </li>
  </ul>
);

const Home = () => (
  <Consumer>
    {({ authenticated }) => (
      <div>
        <h1>Home</h1>
        <Navigation />
      </div>
    )}
  </Consumer>
);

const Account = () => (
  <Consumer>
    {({ authenticated }) =>
      authenticated ? (
        <div>
          <h1>Account</h1>
          <Navigation />
        </div>
      ) : (
        <Redirect to="/signin" />
      )
    }
  </Consumer>
);

const SignUp = () => (
  <Consumer>
    {({ authenticated, signUp }) => {
      if (authenticated) return <Redirect to="/account" />;

      const form = {
        initialValues: { email: "", password: "" },
        onSubmit: ({ email, password }) => signUp(email, password)
      };

      return (
        <Formik {...form}>
          <Form>
            <h1>Sign up</h1>
            <Navigation />
            <label>
              Email:
              <Field type="email" name="email" />
            </label>
            <br />
            <label>
              Password:
              <Field type="password" name="password" />
            </label>
            <br />
            <button type="submit">Sign up</button>
          </Form>
        </Formik>
      );
    }}
  </Consumer>
);

const SignIn = () => (
  <Consumer>
    {({ authenticated, signIn }) => {
      if (authenticated) return <Redirect to="/account" />;

      const form = {
        initialValues: { email: "", password: "" },

        onSubmit: ({ email, password }) => {
          signIn(email, password);
        }
      };

      return (
        <Formik {...form}>
          <Form>
            <h1>Sign in</h1>
            <Navigation />
            <label>
              Email:
              <Field type="email" name="email" />
            </label>
            <br />
            <label>
              Password:
              <Field type="password" name="password" />
            </label>
            <br />
            <button type="submit">Sign in</button>
          </Form>
        </Formik>
      );
    }}
  </Consumer>
);

const SignOut = () => (
  <Consumer>
    {({ signOut }) => {
      signOut();
      return <Redirect to="/" />;
    }}
  </Consumer>
);

render(
  <Auth0 webAuth={webAuth}>
    <Router>
      <Demo />
    </Router>
  </Auth0>,
  document.querySelector("#demo")
);
