'use strict'

function get_api_url() {
  if (process.env.CLI_ENV === 'release') {
    return '"http://m.pipgame.com/api/v1"';
  }
  return '"http://192.168.0.252:7123/api/v1"';
}
module.exports = {
  NODE_ENV: '"production"',
  API_URL: get_api_url(),
  upload_url: process.env.CLI_ENV === 'release' ? '"http://m.pipgame.com/api/v1/en_qas/upload_img"' : '"http://192.168.0.252:7123/api/v1"'
}
