import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { useSession, signIn, signOut } from "next-auth/react"
import { toast } from "react-toastify";

type Props = {
  key?: number;
  authState: boolean | undefined;
};

const Navbar = ({ authState }: Props) => {
  const { isAuthenticated } = useContext(userContext);
  const [admin, setAdmin] = useState<boolean>(false);
  const { data: session } = useSession()
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
    toast.success('Logout Success!', {
      position: "top-right",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    signOut()
  };
  return (
    <header className="primary-bg sticky top-0 backdrop-blur-md z-20 shadow-md w-full">
      <nav className="flex justify-between md:p-2 h-[59px] items-center max-w-[1430px] mx-auto px-3 md:px-3 ">
        <Link href={"/"}>
          <div className="font-bold text-white hover:text-gray-400 transition-all duration-200 cursor-pointer">
            TechWithFZ
          </div>
        </Link>
        <div className="items-center gap-20 hidden md:inline-flex">
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
        {authState || session ? (
          <div className="flex items-center space-x-5">
            <p  className="font-bold textStyle cursor-pointer">Welcome</p>
            <p
              className="commonButton font-semibold cursor-pointer text-white px-5 py-1"
              onClick={logOut}
            >
              Logout
            </p>
            {admin && (
              <Link href={"/admin"} ><p className="commonButton font-semibold cursor-pointer text-white px-3 py-1">
                Welcome Faizan
              </p>
              </Link>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-12">
            <Link href={"/login"}>
              <p className="font-bold textStyle cursor-pointer hidden md:inline-flex">Login</p>
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
