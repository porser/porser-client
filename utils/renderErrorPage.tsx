import ErrorPage from "pages/_error";
import type { ErrorType } from "utils/useConfirmAuthentication";

interface Errors {
  globalError?: ErrorType;
  connectionError?: ErrorType;
}

const renderErrorPage = (errors?: Errors) => {
  const { globalError = null, connectionError = null } = errors || {};

  return globalError ? (
    <ErrorPage title={globalError} statusCode={500} />
  ) : connectionError ? (
    <ErrorPage title={connectionError} statusCode={500} />
  ) : (
    <ErrorPage statusCode={500} />
  );
};

export default renderErrorPage;
