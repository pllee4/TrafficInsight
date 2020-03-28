const jsonServer = require('json-server')
const expressJwt = require('express-jwt')

const config = require('./config')
const data = require('./data')
const user = require('./user')
const token = require('./token')

const server = jsonServer.create()
// const middlewares = jsonServer.defaults({ noCors: true })
// server.use(middlewares);

const router = jsonServer.router(data.init())

// Token authorize
const tokenAuthorize = expressJwt({
  secret: config.secret,
  audience: config.audience,
  issuer: config.issuer,
  credentialsRequired: false,
  getToken: token.getToken,
  isRevoked: (req, payload, done) => done(null, data.isRevokedToken(payload))
})
const fetch = require("node-fetch");
// Role authorize
const roleAuthorize = (req, res, next) => {

  if (req.method === 'GET') {
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request
    var url = req.originalUrl.slice(1)
    console.log(url)

    fetch(
        url,{
          mode: 'cors',
          method: 'GET',
          headers:{
          }
        }
    )
    // .then(function(data){
    //   console.log(data)
    // })
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson)
      return res.status(200).send(myJson)
    })
    // .then(res => res.text())          // convert to plain text
    // .then(text => console.log(text))  // then log it out
  } else if (!req.user){
     return res.status(401).send({ message: 'Requires authentication.' })
  }
  // TODO: delete token or logout
  // const user = data.getUserBySlug(req.user.slug)
  // if (user.roles.includes('administrator')) return next()
  // res.status(403).send({ message: 'Requires administrator.' })
}

// Common middlewares
server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  // enable?
  if (!config.enableDelay) return next()
  // ignore options request
  if (req.method === 'OPTIONS') return next()
  setTimeout(next, Math.random() * 1000)
})

// backdoor: Toggle delay action
server.get('/backdoor/delay', (req, res) => {
  config.enableDelay = !config.enableDelay
  res.send(config.enableDelay)
})

// backdoor: Reset database
server.get('/backdoor/reset', (req, res) => {
  data.init()
  router.db.read()
  res.send('The database has been reset')
})

// Create token
server.post('/tokens', token.create)

// Check token
server.get('/tokens/:token?', tokenAuthorize, token.check)

// Revoke token
server.delete('/tokens/:token?', tokenAuthorize, token.revoke)

// Get login user
server.get('/users/me', tokenAuthorize, user.me)

// Use default json server router
server.use(tokenAuthorize, roleAuthorize, router)

// Friendly error output
server.use((err, req, res, next) => {
  if (err.name !== 'UnauthorizedError') return next(err)
  res.status(401).send({ message: err.message })
})

// Listen on a specific host via the HOST environment variable
// var host = process.env.HOST || "127.0.0.1";
// // Listen on a specific port via the PORT environment variable
// var port = process.env.PORT || 3000;
//
// var cors_proxy = require("cors-anywhere");
// cors_proxy
//   .createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ["origin", "x-requested-with"],
//     removeHeaders: ["cookie", "cookie2"]
//   })
//   .listen(port, host, function() {
//     console.log("Running CORS Anywhere on " + host + ":" + port);
//   });

module.exports = server

/**
 * full fake REST API with json-server
 * https://github.com/typicode/json-server#module
 * https://www.ibm.com/developerworks/cn/web/1103_chenyan_restapi/
 * https://blog.jobbole.com/41233/
 * https://github.com/auth0/express-jwt
 * https://github.com/auth0-blog/nodejs-jwt-authentication-sample
 * https://github.com/auth0/express-jwt
 * http://ngionic.com/2015/06/%E5%9F%BA%E4%BA%8Ejson%E7%9A%84web-token%E7%9A%84nodejs-api%E9%AA%8C%E8%AF%81%E5%AE%9E%E4%BE%8B/
 * http://hao.jser.com/archive/8137/
 * https://github.com/hokaccha/node-jwt-simple
 * http://www.haomou.net/2014/08/13/2014_web_token/
 */
