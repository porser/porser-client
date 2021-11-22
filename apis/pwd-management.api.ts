import { FeathersError } from "@feathersjs/errors";
import {
  CONNECTION_ERROR,
  INVALID_LINK_ERROR,
  SERVER_ERROR,
  USER_NOT_VERIFIED
} from "constants.app";
import type { IUserRaw } from "types";
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

type SendResetEmailResponseType = { message: string };
type ResetResponseType = { message: string };
type VerifyTokenResponseType = { message: string };

const makeAPI = (feathersClient: FeathersClient) => ({
  sendResetPasswordEmail: async (
    email: IUserRaw["email"]
  ): Promise<Response<SendResetEmailResponseType>> => {
    const response: Response<SendResetEmailResponseType> = { error: false };

    const successMessage = [
      "در صورتی که حساب کاربری با این ایمیل ثبت شده باشد",
      "ایمیلی شامل لینک بازیابی رمز عبور، برایتان ارسال خواهد شد."
    ].join("، ");

    try {
      await feathersClient.service("password-management").create({
        type: "SEND_RESET_PASSWORD",
        payload: { email }
      });

      response.data = { message: successMessage };
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
          const data = <{ field?: string; reason?: string }>(
            (<FeathersError>e).data
          );

          if (data.field === "email")
            response.errors.email = "ایمیل غیر معتبر می‌باشد.";
          else if (data.reason === "notVerified")
            response.errors.global = USER_NOT_VERIFIED;
          else response.errors.skip = successMessage;

          break;
        }
        case "GeneralError":
          break;
        default: {
          response.errors.global = SERVER_ERROR;
        }
      }
    }

    return response;
  },
  resetPassword: async (
    password: IUserRaw["password"],
    token: string
  ): Promise<Response<ResetResponseType>> => {
    const response: Response<ResetResponseType> = { error: false };

    try {
      await feathersClient.service("password-management").create({
        type: "RESET_PASSWORD",
        payload: { password, token }
      });

      response.data = {
        message:
          "تمامی دستگاه‌هایی که قبلاً با حساب کاربری شما وارد سیستم شده بودند، از سیستم خارج گردیدند."
      };
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
          const data = <{ field?: string; reason?: string }>(
            (<FeathersError>e).data
          );

          if (data.field === "password")
            response.errors.password = "رمز عبور معتبر نمی‌باشد.";
          else if (data.reason === "notVerified")
            response.errors.global = USER_NOT_VERIFIED;
          else response.errors.global = INVALID_LINK_ERROR;

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
  },
  verifyResetToken: async (
    token: string
  ): Promise<Response<VerifyTokenResponseType>> => {
    const response: Response<VerifyTokenResponseType> = { error: false };

    try {
      await feathersClient.service("password-management").create({
        type: "VERIFY_RESET_TOKEN",
        payload: { token }
      });
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

          if (data.reason === "notVerified")
            response.errors.global = USER_NOT_VERIFIED;
          else response.errors.global = INVALID_LINK_ERROR;

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
