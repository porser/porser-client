import * as React from "react";

interface Context {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const FormBuilderContext = React.createContext<Context | null>(null);

export default FormBuilderContext;
