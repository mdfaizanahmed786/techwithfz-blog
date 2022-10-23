import { createContext, useEffect, useState } from "react";

const userContext = createContext();
const { Provider } = userContext;

const AppProvider = ({ children }) => {
  const [isAuth, setIsAuth]=useState()
 
const isAuthenticated=()=>{
  const auth=JSON.parse(localStorage.getItem('auth'))
  if(auth?.isAdmin && auth?.authToken) return true;
  else{
    return false;
  }
}
  return (
    <Provider value={{ isAuthenticated }}>
      {children}
    </Provider>
  );
};

export {userContext, AppProvider}