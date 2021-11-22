import { REFRESH_TOKEN_COOKIE_KEY } from "constants.app";
import { remove } from "./cookies";

const removeRefreshToken = () => remove(REFRESH_TOKEN_COOKIE_KEY);

export default removeRefreshToken;
