import { ACCESS_TOKEN_COOKIE_KEY } from "constants.app";
import { remove } from "./cookies";

const removeAccessToken = () => remove(ACCESS_TOKEN_COOKIE_KEY);

export default removeAccessToken;
