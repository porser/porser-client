import { FeathersError } from "@feathersjs/errors";
import { CONNECTION_ERROR, SERVER_ERROR } from "constants.app";
import type { IUserRaw } from "types";
import type { FeathersClient } from "utils/feathers/client";

type Response<T> = {
  error: boolean;
  data?: T;
  errors?: {
    global?: string;
    auth?: string;
    connection?: string;
    [key: string]: string | undefined;
  };
};

type RefreshResponseType = { accessToken: string };

const makeAPI = (feathersClient: FeathersClient) => ({
  refreshAccessToken: async (
    userId: IUserRaw["_id"],
    refreshToken: string
  ): Promise<Response<RefreshResponseType>> => {
    const response: Response<RefreshResponseType> = { error: false };

    try {
      const resp = <{ accessToken: string }>(
        await feathersClient
          .service("refresh-tokens")
          .create({ userId, refreshToken })
      );

      response.data = { accessToken: resp.accessToken };
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
        default:
          response.errors.global = SERVER_ERROR;
      }
    }

    return response;
  }
});

export default makeAPI;
