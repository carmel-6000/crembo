import React from "react";
import { Redirect } from 'react-router';

const Auth = {

  _isAuthenticated: false,

  isAuthenticated() {

    let at = localStorage.getItem('accessToken');
    // console.log("access token?", at);
    this._isAuthenticated = at !== null;
    return this._isAuthenticated;

  },
  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  authFetch(url) {

    let accessToken = Auth.getAccessToken();
    console.log("authFetch given accessToken:", accessToken);
    if (accessToken === null) {
      return url;
    } else {

      if (url.includes("?")) {
        url += "&access_token=" + accessToken;
      } else {
        url += "?access_token=" + accessToken;
      }
      return fetch(url);



    }
  },

  authPost(url, uRow) {
    let postUrl ="";
    let accessToken = Auth.getAccessToken();
    console.log("authFetch returns accessToken", accessToken);
    if (accessToken === null) {
      return url,  + accessToken;
    } else {

      if (url.includes("?")) {
        postUrl = url +"&access_token=" + accessToken;
      } else {
        postUrl = url+ "?access_token=" + accessToken;
      }
      console.log("postURl", postUrl)
      return fetch(postUrl,uRow);

    }
  },

  authenticate(email, pw, cb) {

    fetch('/api/Users/login', {
      method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: pw })
    })

      .then(response => { return response.json() }).then(res => {

        //res == userId, ttl, id(=accessToken), created
        console.log("res after login", res);
        if (res.error) {

          this._isAuthenticated = false;
          localStorage.setItem('accessToken', '');
          return cb(false);
        } else {

          console.log("is this the access token?", res.id);
          this._isAuthenticated = true;
          localStorage.setItem('accessToken', res.id);
          localStorage.setItem('userId', res.userId);

          return cb(true)
        }

      });
  },
  logout(cb) {

    localStorage.removeItem('accessToken', '');
    this._isAuthenticated = false;
    return;
  }

}

export default Auth;