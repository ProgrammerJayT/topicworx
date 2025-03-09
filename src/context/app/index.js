import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [loader, setLoader] = useState({
    visibility: true,
    message: "",
  });

  const values = {
    loader,
    setLoader,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
