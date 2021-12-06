import * as React from "react";
import Context from "./Context";

const useContext = () => {
  return React.useContext(Context);
};

export default useContext;
