import * as React from "react";
import Context, { IFormContext } from "./Context";

interface ProviderProps {
  children?: React.ReactNode;
  context: IFormContext;
}

const Provider = (props: ProviderProps) => {
  const { children, context } = props;

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Provider;
