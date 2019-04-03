
const Auth = {
  
  _isAuthenticated: false,

  isAuthenticated() {
    let at = localStorage.getItem('accessToken');
    this._isAuthenticated = at !== null;
    return this._isAuthenticated;

  },
  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  authFetch(url) {

    let accessToken = Auth.getAccessToken();
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
    if (accessToken === null) {
      return url,  + accessToken;
    } else {

      if (url.includes("?")) {
        postUrl = url +"&access_token=" + accessToken;
      } else {
        postUrl = url+ "?access_token=" + accessToken;
      }
      return fetch(postUrl,uRow);

    }
  },

  authenticate(email, pw, cb) {

    fetch('/api/Managers/login', {
      method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: pw })
    })

      .then(response => { return response.json() }).then(res => {

        //res == userId, ttl, id(=accessToken), created
      
        if (res.error) {
        
          this._isAuthenticated = false;
          localStorage.removeItem('accessToken');
          localStorage.setItem('userId', null);
          return cb(false);
        } else {
          
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