import React, { useEffect, useState } from "react";

type Props = {};

const Admin = (props: Props) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem('token')!)
  }, []);
  return <div>Admin page</div>;
};

export default Admin;
