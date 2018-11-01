import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { WebAuth } from "auth0-js";
import { Provider, Consumer, Handler } from "../../src";
import AUTH0_CONFIG from "../../auth0_config.json";

const webAuth = new WebAuth(AUTH0_CONFIG);

const Home = () => (
  <Consumer>
    {auth0 => {
      const handleSignOut = () => {
        auth0.signOut();
      };

      return (
        <div>
          <h1>Home {auth0.isAuthenticated && "(Signed in)"}</h1>
          <Link to="/signup">Sign up</Link>
          <br />
          <Link to="/signin">Sign in</Link>
          <br />
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      );
    }}
  </Consumer>
);

const SignUp = () => (
  <Consumer>
    {auth0 => {
      const form = {
        initialValues: { email: "", password: "" },

        onSubmit: ({ email, password }) => {
          auth0.signUp(email, password);
        }
      };

      return (
        <Formik {...form}>
          <Form>
            <h1>Sign up</h1>
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
    {auth0 => {
      if (auth0.isAuthenticated) return <Redirect to="/account" />;

      const form = {
        initialValues: { email: "", password: "" },

        onSubmit: ({ email, password }) => {
          auth0.signIn(email, password);
        }
      };

      return (
        <Formik {...form}>
          <Form>
            <Link to="/signup">Sign up</Link>
            <br />
            <Link to="/signin">Sign in</Link>
            <h1>Sign in</h1>
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

const Account = () => (
  <Consumer>
    {auth0 => {
      if (!auth0.isAuthenticated) return <Redirect to="/signin" />;

      const handleSignOut = () => {
        auth0.signOut();
      };

      return (
        <div>
          <h1>Account</h1>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      );
    }}
  </Consumer>
);

function Demo() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/account" component={Account} />
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
}

ReactDOM.render(
  <BrowserRouter>
    <Provider webAuth={webAuth}>
      <Demo />
    </Provider>
  </BrowserRouter>,
  document.querySelector("#demo")
);
