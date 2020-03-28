require('dotenv').config()

module.exports = {
  secret: "aaa",
  issuer: "dfsdaf",
  audience: "dsfds",
  expires: 24 * 60 * 60, // 24h
  // enable delay for testing
  enableDelay: false
}
