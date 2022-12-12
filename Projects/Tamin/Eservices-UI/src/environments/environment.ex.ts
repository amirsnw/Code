export const environment = {
  // production
  production: true,
  accessToken: 'access_token',
  expiresIn: 'expires_in',
  redirectUrl: 'https://ex-eservices.tamin.ir/auth/access',
  baseUrl: 'https://ex-eservices.tamin.ir/view',
  authenticationEndpoint: 'https://account.tamin.ir/auth/server/authorize',
  verifyEndpoint: '',
  logoutUrl: 'https://account.tamin.ir/auth/signout?redirect_uri=https://eservices.tamin.ir/view/index.html',
  // logoutUrl: 'https://account.tamin.ir/auth/signout',
  responseType: 'assertion',
  clientId: '1e3923181a0818041c1d192c3805040f',
  getUserNameUrl: 'https://ex-eservices.tamin.ir/api/users/current-user',

  restTimeout: 60000,
  baseurl_base: 'https://ex-eservices.tamin.ir/api',
  baseurl_sso: 'https://eservices-sso.tamin.ir/api',
  baseurl_gov: 'https://ex-eservices.tamin.ir/api',
  baseurl_sabeghe2: 'https://sabeghe.tamin.ir/api',
  baseurl_eblagh2: 'https://eblagh2.tamin.ir/announcement/api',
  baseurl_baje: 'http://172.16.13.164:7001/insurance-list/api',
  baseurl_account: 'https://me.tamin.ir/api',
  theme: 'theme-web'
};
