import React  from "react";
import { createContext, useState } from "react";

const userContext = createContext({} as any);
const { Provider } = userContext;


const AppProvider = ({ children }:any) => {
  const [cookieAuth, setCookieAuth]=useState("")

 
 
  return <Provider value={{  cookieAuth, setCookieAuth }}>{children}</Provider>;
};

export { userContext, AppProvider };
