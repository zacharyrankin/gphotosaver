'use strict';

const axios = require('axios');
const qs = require('querystring');

module.exports = ({log, code, clientId, clientSecret, redirectUri}) => {
  const url = 'https://www.googleapis.com/oauth2/v4/token';
  const params = qs.stringify({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });
  log.debug('auth/tokens - requesting %s?%s', url, params);
  return axios.post(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(res => {
    log.debug('auth/tokens - response %j', res.data);
    return {
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
      expiresIn: res.data.expires_in,
    };
  });
};
