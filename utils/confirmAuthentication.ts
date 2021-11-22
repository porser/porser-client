import makeTokenAPI from "apis/token.api";
import decode from "jwt-decode";
import type { GetServerSidePropsContext } from "next";
import { retrieveRefreshToken } from "utils";
import feathersClient from "utils/feathers/client";

interface Response {
  data?: {
    refreshToken: string;
    accessToken: string;
  };
  errors?: {
    connection?: string;
    auth?: string;
    global?: string;
  };
}

type ConfirmAuthentication = {
  (): Promise<Response>;
  (context: GetServerSidePropsContext): Promise<Response>;
};

const tokenAPI = makeTokenAPI(feathersClient);

const confirmAuthentication: ConfirmAuthentication = async (
  context?: GetServerSidePropsContext
) => {
  const response: Response = {};

  const refreshToken = context
    ? <string | undefined>context.req.cookies["porser-refresh-token"]
    : retrieveRefreshToken();

  if (!refreshToken) {
    response.errors = { auth: "کاربر اهراز هویت نشده است." };
    return response;
  }

  const decoded: { sub: string } = decode(refreshToken);

  const apiResponse = await tokenAPI.refreshAccessToken(
    decoded.sub,
    refreshToken
  );

  if (apiResponse.error && apiResponse.errors) {
    const { auth, global, connection } = apiResponse.errors;

    if (connection) response.errors = { connection };
    else if (global) response.errors = { global };
    else if (auth) response.errors = { auth };

    return response;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { accessToken } = apiResponse.data!;

    response.data = { accessToken, refreshToken };

    return response;
  }
};

export default confirmAuthentication;
