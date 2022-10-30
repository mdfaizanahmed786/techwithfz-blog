import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";

type Props = {
  key?: number;
  authState: boolean | undefined;
};

const Navbar = ({ authState }: Props) => {
  const { isAuthenticated } = useContext(userContext);
  const [admin, setAdmin] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated()) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [router.query]);

  const logOut = () => {
    router.push("/")
    localStorage.removeItem("auth");
  };
  return (
    <header className="primary-bg sticky top-0 backdrop-blur-md z-20 shadow-md">
      <nav className="flex justify-between p-2 h-[59px] items-center max-w-[1430px] mx-auto">
        <Link href={"/"}>
          <div className="font-bold text-white hover:text-gray-400 transition-all duration-200 cursor-pointer">
            TechWithFZ
          </div>
        </Link>
        <div className="flex items-center gap-20">
          <Link href={"/"}>
            <p className="font-semibold text-md cursor-pointer text-white hover:text-gray-400 transition-all duration-200">
              Home
            </p>
          </Link>
          <Link href={"/blog"}>
            <p className="font-semibold text-md cursor-pointer text-white hover:text-gray-400 transition-all duration-200">
              Blog
            </p>
          </Link>
          <Link href={"/about"}>
            <p className="font-semibold text-md cursor-pointer text-white hover:text-gray-400 transition-all duration-200">
              About
            </p>
          </Link>
        </div>
        {authState ? (
          <div className="flex items-center space-x-5">
            <p
              className="commonButton font-semibold cursor-pointer text-white px-5 py-1"
              onClick={logOut}
            >
              Logout
            </p>
            {admin && (
              <Link href={"/admin"} ><p className="commonButton font-semibold cursor-pointer text-white px-3 py-1">
                Welcome Admin
              </p>
              </Link>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-12">
            <Link href={"/login"}>
              <p className="font-bold textStyle cursor-pointer">Login</p>
            </Link>
            <Link href={"/signup"}>
              <p className="commonButton font-semibold cursor-pointer text-white px-5 py-1">
                Signup
              </p>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
