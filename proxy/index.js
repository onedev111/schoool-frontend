const http = require('http')
const httpProxy = require('http-proxy')
const cors = require('cors')
const request = require('request')

const port = 4000
const apiBase = 'https://www.schoool.net'
const proxy = httpProxy.createProxyServer({ secure: false })
const corsResolver = cors()

proxy.on('error', (e) => console.error(e))

const urlPath = '/url?'

http
  .createServer((req, res) => {
    corsResolver(req, res, () => {
      delete req.headers.host
      delete req.headers.origin
      if (req.url.startsWith(urlPath)) {
        request.get(decodeURIComponent(req.url.slice(urlPath.length))).pipe(res)
      } else {
        proxy.web(req, res, { target: apiBase })
      }
    })
  })
  .listen(port, () => console.log('API proxy listening on port ' + port))
