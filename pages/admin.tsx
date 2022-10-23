import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";

type Props = {};

const Admin = (props: Props) => {
  const [user, setUser] = useState("");
  const authContext=useContext(userContext)
  
  const router=useRouter();

  useEffect(() => {
   
  authContext.isAuthState ? router.push("/admin") : router.push("/")
  console.log(authContext.isAuthState)
 
  }, []);
  return <div>Admin page</div>;
};

export default Admin;


