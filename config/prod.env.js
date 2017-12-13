'use strict'
function get_api_url() {
  if (process.env.CLI_ENV === 'release') {
    return '"http://m.pipgame.com/api/v1"';
  }
  return '"http://192.168.0.252:7092/api/v1"';
}
module.exports = {
  NODE_ENV: '"production"',
  API_URL: get_api_url()
}
