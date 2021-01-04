const http = require('http')
const httpProxy = require('http-proxy')
const cors = require('cors')
const querystring = require('querystring')

const port = 4000
const apiBase = 'https://www.schoool.net'
const proxy = httpProxy.createProxyServer({ secure: false })
const corsResolver = cors()

proxy.on('error', (e) => console.error(e))

http
  .createServer((req, res) => {
    corsResolver(req, res, () => {
      delete req.headers.host
      delete req.headers.origin

      proxy.web(req, res, { target: apiBase })
    })
  })
  .listen(port, () => console.log('API proxy listening on port ' + port))
