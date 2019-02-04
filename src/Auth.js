import { WebAuth } from "auth0-js";

class Auth {
  webAuth;
  accessToken;
  idToken;
  expiresAt;

  constructor(config) {
    this.webAuth = new WebAuth({
      ...config,
      responseType: "token id_token"
    });
  }

  handleAuthentication(callback) {
    this.webAuth.parseHash((error, result) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);
      }

      callback && callback(error, result);
    });
  }

  renewSession(callback) {
    this.webAuth.checkSession({}, (error, result) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);
      }

      callback && callback(error, result);
    });
  }

  setSession(result) {
    const expiresAt = result.expiresIn * 1000 + new Date().getTime();

    this.accessToken = result.accessToken;
    this.idToken = result.idToken;
    this.expiresAt = expiresAt;

    localStorage.setItem("authenticated", "true");
  }

  clearSession() {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    localStorage.removeItem("authenticated");
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }
}

export default Auth;
