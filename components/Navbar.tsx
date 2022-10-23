import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";

type Props = {
  key?: number;
  authState: boolean | undefined;
};

const Navbar = ({ authState }: Props) => {
  return (
    <header>
      <nav className="flex gap-10">
        <Link href={"/"}>Home</Link>
        <Link href={"/blog"}>Blog</Link>
        {authState ? (
          <button onClick={() => localStorage.removeItem("auth")}>
            Signout
          </button>
        ) : (
          <>
            <Link href={"/login"}>Login</Link>
            <Link href={"/signup"}>Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
