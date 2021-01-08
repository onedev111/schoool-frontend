const appId = process.env.REACT_APP_FACEBOOK_APP_ID

if (!appId)
  alert('Please put facebook app id into .env as REACT_APP_FACEBOOK_APP_ID')

export const initFacebook = async (): Promise<any> =>
  new Promise((resolve) => {
    const win = window as any
    if (win.FB) return resolve(win.FB)

    win.fbAsyncInit = function () {
      win.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v9.0',
      })
      resolve(win.FB)
    }
    const js = document.createElement('script')
    const fjs = document.getElementsByTagName('script')[0]
    const id = 'facebook-jssdk'
    if (document.getElementById(id)) {
      return
    }
    js.id = id
    js.src = '//connect.facebook.net/en_US/sdk.js'
    fjs.parentNode?.insertBefore(js, fjs)
  })
