'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })


module.exports = {
  NODE_ENV: '"development"',
  API_URL: '"http://192.168.0.252:7123/api/v1"',
  upload_url: '"http://192.168.0.252:7123/api/v1/en_qas/upload_img"'
}
