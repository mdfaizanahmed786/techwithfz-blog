import { createContext, useState } from "react";

const userContext = createContext();
const { Provider } = userContext;

const AppProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ authToken: "", isAdmin: false });
  const isAuthSate = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log(auth)
    if (auth.authToken && auth.isAdmin) return true;
    return false;
  };

  return (
    <Provider value={{ authState, isAuthSate, setAuthState }}>
      {children}
    </Provider>
  );
};

export {userContext, AppProvider}