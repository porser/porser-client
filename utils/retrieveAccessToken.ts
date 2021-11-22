import { ACCESS_TOKEN_COOKIE_KEY } from "constants.app";
import { retrieve } from "./cookies";

const retrieveAccessToken = () => retrieve(ACCESS_TOKEN_COOKIE_KEY);

export default retrieveAccessToken;
