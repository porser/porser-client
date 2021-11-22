import { ACCESS_TOKEN_COOKIE_KEY } from "constants.app";
import { store } from "./cookies";

const storeAccessToken = (accessToken: string) =>
  store(ACCESS_TOKEN_COOKIE_KEY, accessToken);

export default storeAccessToken;
