import auth0 from "auth0-js";

class Auth {
  auth0;
  idToken;
  accessToken;
  expiresAt;

  constructor({ options }) {
    this.auth0 = new auth0.WebAuth({
      responseType: "token id_token",
      ...options
    });
  }

  handleAuthentication = () =>
    new Promise((resolve, reject) => {
      this.auth0.parseHash((error, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (error) {
          reject(`${err.error}. Check the console for further details.`);
        }
      });
    });

  setSession = authResult => {
    localStorage.setItem("isLoggedIn", "true");
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  };

  renewSession = () =>
    new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (error, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          this.logout();
          reject(
            `Could not get a new token (${err.error}: ${
              err.error_description
            }).`
          );
        }
      });
    });

  logout() {
    this.idToken = null;
    this.accessToken = null;
    this.expiresAt = 0;
    localStorage.removeItem("isLoggedIn");
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }
}

export default Auth;
