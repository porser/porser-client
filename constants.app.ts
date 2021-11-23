import env from "utils/env";

export const isProduction = env("NODE_ENV", "development") === "production";

export const ACCESS_TOKEN_COOKIE_KEY = "porser-access-token";
export const REFRESH_TOKEN_COOKIE_KEY = "porser-refresh-token";

const _DEV_API_URL_ = "http://localhost:3030";

export const API_URL = isProduction
  ? env("NEXT_PUBLIC_API_URL", _DEV_API_URL_)
  : _DEV_API_URL_;

export const SERVER_ERROR = [
  "مشکلی در سرور بوجود آمده است.",
  "لطفاً کمی بعد دوباره امتحان کنید."
].join("\n");

export const CONNECTION_ERROR = [
  "مشکلی در ارتباط با سرور پیش آمده؛",
  "ممکن است دسترسی شما به اینترنت قطع شده و یا اینکه سرعت اینترنت کند باشد.",
  "لطفاً کمی بعد دوباره امتحان کنید."
].join("\n");

export const NOT_FOUND_ERROR = "صفحه مورد نظر شما یافت نشد.";

export const USER_NOT_VERIFIED = [
  "حساب‌ کاربری شما تأیید نشده است.",
  "برای تأیید کردن حساب‌ کاربریتان به ایمیلی که به این منظور، پیش‌تر برایتان ارسال شده، مراجعه کنید."
].join("\n");

export const INVALID_LINK_ERROR =
  "لینک معتبر نمی‌باشد؛ ممکن است منقضی شده باشد.";
