import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useSession, signIn} from "next-auth/react"

type Props = {
  authState:boolean
};

const Signup = (props: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {data}=useSession();
  const session:any=data;
  const loginWithGoogle:any=signIn
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
    <div className="loginPage h-screen md:items-center md:flex">
      <Head>
        <title>Signup |techWithFZ</title>
      </Head>
      <div className="flex md:max-w-[1450px] md:mx-auto mx-5">
        <div className="imageContainer md:flex-[0.45] hidden md:inline-flex">
          <img
            src="/signup.png"
            className="object-cover h-full rounded-tl-md rounded-bl-md"
            alt="login_image"
          />
        </div>
        <div className="bg-[#1E1E1E] md:px-7 px-5 rounded-md md:rounded-none md:rounded-tr-md md:rounded-br-md flex flex-col gap-8  items-center md:flex-[0.55] justify-center shadow-lg  w-full py-7 mt-32 md:mt-0 md:py-0 mb-4 md:mb-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
              <h2 className="font-bold text-2xl text-center text-white">
                SignUp
              </h2>
        
              <div className='google bg-white flex gap-7 text-black justify-center items-center rounded-md py-1 px-2 cursor-pointer border-blue-500 border-2' onClick={loginWithGoogle}>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="google_logo" className='h-10 w-10' />
             <p className='text-lg font-semibold'>Signup with Google</p>
        </div>
            <div className="flex flex-col gap-1">
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
            <button type="submit" className={`${session?.user || props.authState ?  "bg-gray-500 text-white py-2 font-semibold rounded-md" : "commonButton py-2 font-semibold text-white"} `} disabled={session?.user || props.authState}>Signup</button>
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
