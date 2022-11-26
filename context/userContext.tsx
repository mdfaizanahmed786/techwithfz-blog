import React  from "react";
import { createContext, useEffect, useState } from "react";

const userContext = createContext({} as any);
const { Provider } = userContext;

const AppProvider = ({ children }:any) => {
  const [isAuth, setIsAuth] = useState();

  const isAuthenticated = ():any => {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    if (auth) {
      setIsAuth(auth);
    }

    if (auth?.isAdmin && auth?.authToken) return true;
    else {
      return false;
    }
  };
 
  return <Provider value={{ isAuthenticated, isAuth }}>{children}</Provider>;
};

export { userContext, AppProvider };
