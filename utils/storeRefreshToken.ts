import { REFRESH_TOKEN_COOKIE_KEY } from "constants.app";
import { store } from "./cookies";

const storeRefreshToken = (refreshToken: string) =>
  store(REFRESH_TOKEN_COOKIE_KEY, refreshToken);

export default storeRefreshToken;
