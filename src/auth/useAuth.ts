import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { loginRequest, ALLOWED_DOMAINS } from './msalConfig';

export function useAuth() {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const account = accounts[0] ?? null;
  const email = account?.username ?? '';
  const name = account?.name ?? '';
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  const isDomainAllowed = ALLOWED_DOMAINS.includes(domain);

  const signIn = () => {
    instance.loginRedirect(loginRequest);
  };

  const signOut = () => {
    instance.logoutRedirect({
      account,
      postLogoutRedirectUri: 'https://nist-csf.netlify.app',
    });
  };

  return {
    isAuthenticated,
    isAuthorized: isAuthenticated && isDomainAllowed,
    isLoading: inProgress !== InteractionStatus.None,
    account,
    email,
    name,
    domain,
    isDomainAllowed,
    signIn,
    signOut,
  };
}
