import { FeathersError } from "@feathersjs/errors";
import {
  CONNECTION_ERROR,
  INVALID_LINK_ERROR,
  SERVER_ERROR
} from "constants.app";
import type { IUserRaw } from "types";
import { removeRefreshToken, retrieveRefreshToken } from "utils";
import type { FeathersClient } from "utils/feathers/client";

type Response<T> = {
  error: boolean;
  data?: T;
  errors?: {
    connection?: string;
    global?: string;
    auth?: string;
    [key: string]: string | undefined;
  };
};

type SignupResponseType = Omit<IUserRaw, "name" | "password">;
type LoginResponseType = Omit<IUserRaw, "password"> & {
  accessToken: string;
  refreshToken: string;
};
type LogoutResponseType = Omit<Response<undefined>, "data">;
type VerifyResponseType = Omit<Response<undefined>, "data">;

const makeAPI = (feathersClient: FeathersClient) => ({
  register: async (
    email: IUserRaw["email"],
    password: IUserRaw["password"]
  ): Promise<Response<SignupResponseType>> => {
    const response: Response<SignupResponseType> = { error: false };

    try {
      response.data = (await feathersClient.service("users").create({
        email,
        password
      })) as IUserRaw as unknown as SignupResponseType;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(e, null, 2));

      response.errors = {};
      response.error = true;

      switch ((e as FeathersError).name) {
        case "Timeout":
          response.errors.connection = CONNECTION_ERROR;
          break;
        default: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          if ((e as any).errorType === "uniqueViolated") {
            response.errors.email = "کاربری با این ایمیل در سیستم موجود است.";
          } else response.errors.global = SERVER_ERROR;
        }
      }
    }

    return response;
  },
  login: async (
    email: IUserRaw["email"],
    password: IUserRaw["password"]
  ): Promise<Response<LoginResponseType>> => {
    const response: Response<LoginResponseType> = { error: false };

    try {
      const resp = (await feathersClient.authenticate({
        strategy: "local",
        email,
        password
      })) as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user: Omit<IUserRaw, "password">;
        accessToken: LoginResponseType["accessToken"];
        refreshToken: LoginResponseType["refreshToken"];
      };

      response.data = {
        ...resp.user,
        accessToken: resp.accessToken,
        refreshToken: resp.refreshToken
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(e, null, 2));

      response.errors = {};
      response.error = true;

      switch ((e as FeathersError).name) {
        case "Timeout":
          response.errors.connection = CONNECTION_ERROR;
          break;
        case "NotAuthenticated":
          response.errors.auth =
            "کاربری با این ایمیل و رمز عبور موجود نمی‌باشد.";
          break;
        default:
          response.errors.global = SERVER_ERROR;
      }
    }

    return response;
  },
  logout: async (): Promise<LogoutResponseType> => {
    const response: LogoutResponseType = { error: false };
    const refreshToken = retrieveRefreshToken();

    try {
      await feathersClient
        .service("refresh-tokens")
        .remove(null, { query: { refreshToken } });
      await feathersClient.logout();
      removeRefreshToken();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(e, null, 2));

      response.errors = {};
      response.error = true;

      switch ((e as FeathersError).name) {
        case "Timeout":
          response.errors.connection = CONNECTION_ERROR;
          break;
        case "NotAuthenticated":
          response.errors.auth = "کاربر اهراز هویت نشده است.";
          break;
        case "BadRequest":
          response.errors.global = "درخواست شما با خطا روبه‌رو شد.";
          break;
        default:
          response.errors.global = SERVER_ERROR;
      }
    }

    return response;
  },
  verify: async (token: string): Promise<VerifyResponseType> => {
    const response: VerifyResponseType = { error: false };

    try {
      await feathersClient
        .service("verify-account")
        .create({ type: "VERIFY", payload: { token } });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(e, null, 2));

      response.errors = {};
      response.error = true;

      switch ((<FeathersError>e).name) {
        case "Timeout":
          response.errors.connection = CONNECTION_ERROR;
          break;
        case "BadRequest": {
          const data = <{ reason?: string }>(<FeathersError>e).data;

          if (data.reason !== "alreadyVerified")
            response.errors.global = INVALID_LINK_ERROR;

          break;
        }
        case "GeneralError":
          response.errors.global = SERVER_ERROR;
          break;
        default: {
          response.errors.global = SERVER_ERROR;
        }
      }
    }

    return response;
  }
});

export default makeAPI;
