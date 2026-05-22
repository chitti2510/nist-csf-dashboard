import { type Configuration, LogLevel } from '@azure/msal-browser';

// Allowed email domains — ansamcal.com will be added once their app
// registration is configured with the correct redirect URI.
export const ALLOWED_DOMAINS = ['precision-cyber.com'];

export const msalConfig: Configuration = {
  auth: {
    clientId: '14d22694-9f40-4be1-a2d4-dedae915f4d5',
    authority: 'https://login.microsoftonline.com/5c13d307-0720-423a-9e91-54a8e4aff38d',
    redirectUri: 'https://nist-csf.netlify.app',
    postLogoutRedirectUri: 'https://nist-csf.netlify.app',
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: (_level, _message, containsPii) => {
        if (containsPii) return;
      },
      logLevel: LogLevel.Error,
    },
  },
};

export const loginRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'email'],
};
