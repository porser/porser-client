import { REFRESH_TOKEN_COOKIE_KEY } from "constants.app";
import { retrieve } from "./cookies";

const retrieveRefreshToken = () => retrieve(REFRESH_TOKEN_COOKIE_KEY);

export default retrieveRefreshToken;
