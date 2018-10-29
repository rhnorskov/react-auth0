class Auth0 {
  constructor(webAuth) {
    this.webAuth = webAuth;
  }

  signUp(email, password, options = {}) {
    return new Promise((resolve, reject) => {
      this.auth0.webAuth.signup(
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
  }

  signIn(email, password, options = {}) {
    return new Promise((resolve, reject) => {
      this.webAuth.login(
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
  }

  signOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
  }

  authorize(connection, options = {}) {
    return new Promise((resolve, reject) => {
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
    });
  }

  static isAuthenticated() {
    let expiresAt = Number(localStorage.getItem("expires_at"));

    return new Date().getTime() < expiresAt;
  }

  static setSession(idToken, accessToken, expiresIn) {
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("expires_at", new Date().getTime() + expiresIn * 1000);
  }
}

export default Auth0;
