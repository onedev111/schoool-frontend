const appId = process.env.REACT_APP_FACEBOOK_APP_ID

if (!appId)
  alert('Please put facebook app id into .env as REACT_APP_FACEBOOK_APP_ID')
else initFB()

function initFB() {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId,
      cookie: true,
      xfbml: true,
      version: 'v9.0',
    })
  }
  ;(function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = '//connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}
