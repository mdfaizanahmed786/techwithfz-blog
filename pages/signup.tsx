import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {};

const Signup = (props: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try{

      const addUser = await fetch("http://localhost:3000/api/createuser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
      });
      const response = await addUser.json();
      
      if(response.success){
        toast.success('Signup Success!', {
          position: "top-right",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          router.push("/")
          localStorage.setItem("auth", JSON.stringify(response));
      }
      else {
        toast.error('Try again with another email or password!', {
          position: "top-right",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }

    }
    catch(er){
      toast.error('An error occurred while creating your account!', {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };
  return (
    <div className="loginPage h-screen items-center flex">
      <Head>
        <title>Signup |techWithFZ</title>
      </Head>
      <div className="flex max-w-[1450px] mx-auto h-[32rem]">
        <div className="imageContainer flex-[0.45]">
          <img
            src="/signup.png"
            className="object-cover h-full rounded-tl-md rounded-bl-md"
            alt="login_image"
          />
        </div>
        <div className="bg-[#1E1E1E] px-7 rounded-tr-md rounded-br-md flex flex-col gap-8  items-center flex-[0.55] justify-center shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-2xl text-center text-white">
                SignUp
              </h2>
              <label htmlFor="name" className="font-semibold text-white">
                Name
              </label>
              <input
                ref={nameRef}
                type="text"
                name="name"
                id="name"
                autoComplete="false"
                minLength={3}
                className="bg-[#2E2E2E] px-5 py-2 rounded-md outline-none text-white border-[#10935F] border-2"
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold text-white">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                minLength={7}
                autoComplete="false"
                className="bg-[#2E2E2E] px-5 py-2 rounded-md outline-none text-white border-[#10935F] border-2 "
                required
                placeholder="Enter your email"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold text-white">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                autoComplete="false"
                minLength={5}
                className="bg-[#2E2E2E] px-5 py-2 rounded-md outline-none text-white border-[#10935F] border-2 "
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className='commonButton py-2 font-semibold text-white'>Signup</button>
          </form>
          <p className="text-white text-sm">
            Already have an account?{" "}
            <Link href="/login">
              <span className="textStyle font-bold cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
