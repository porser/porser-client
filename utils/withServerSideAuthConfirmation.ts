import { ACCESS_TOKEN_COOKIE_KEY } from "constants.app";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect
} from "next";
import confirmAuthentication from "./confirmAuthentication";

const withServerSideAuthConfirmation = async (
  context: GetServerSidePropsContext,
  redirectOptions: Redirect = { permanent: false, destination: "/dashboard" }
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  const { data, errors } = await confirmAuthentication(context);

  if (errors) {
    const { global, auth, connection } = errors;

    if (auth) return { props: {} };
    return {
      props: {
        preRenderErrors: {
          globalError: global || null,
          connectionError: connection || null
        }
      }
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { accessToken } = data!;

    context.res.setHeader(
      "set-cookie",
      `${ACCESS_TOKEN_COOKIE_KEY}=${accessToken}`
    );

    return { redirect: redirectOptions };
  }
};

export default withServerSideAuthConfirmation;
