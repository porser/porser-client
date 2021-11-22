import * as React from "react";
import {
  confirmAuthentication,
  removeRefreshToken,
  storeAccessToken
} from "utils";

export type ErrorType = string | null;

const useConfirmAuthentication = (active = true) => {
  const [authenticating, setAuthenticating] = React.useState(false);

  const [error, setError] = React.useState(false);

  const [globalError, setGlobalError] = React.useState<ErrorType>(null);
  const [connectionError, setConnectionError] = React.useState<ErrorType>(null);
  const [authenticationError, setAuthenticationError] =
    React.useState<ErrorType>(null);

  const resetStates = () => {
    setGlobalError(null);
    setConnectionError(null);
    setAuthenticationError(null);
    setError(false);
    setAuthenticating(false);
  };

  React.useEffect(() => {
    if (!active) return resetStates();

    void (async () => {
      setAuthenticating(true);

      const { data, errors } = await confirmAuthentication();

      if (errors) {
        setError(true);

        const { auth, global, connection } = errors;

        if (auth) {
          setAuthenticationError(auth);
          removeRefreshToken();
        } else if (global) setGlobalError(global);
        else if (connection) setConnectionError(connection);
      } else {
        setError(false);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        storeAccessToken(data!.accessToken);
      }

      setAuthenticating(false);
    })();
  }, [active]);

  return {
    error,
    authenticating,
    globalError,
    connectionError,
    authenticationError
  };
};

export default useConfirmAuthentication;
