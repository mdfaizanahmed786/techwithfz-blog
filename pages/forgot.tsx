import Head from "next/head";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";

interface Auth {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
}
interface GoogleAuth {
  google: Auth;
}
type Props = {
  authState: boolean;
  providers: GoogleAuth;
};

const token = process.env.NEXT_PUBLIC_FORGOT_TOKEN;
const Forgot = (props: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [captcha, setCaptcha] = useState<string | null>("");
  const { data } = useSession();

  const session: any = data;
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!captcha) {
        toast.error("Invalid captcha", {
          position: "top-right",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      const forgotPassword = await fetch(
        "https://techwithfz.vercel.app/api/forgot",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            token,
            email: emailRef.current?.value,
          }),
        }
      );
      const response = await forgotPassword.json();
      if (response.success && captcha) {
        toast.success(
          "Instructions have been sent to your email to reset your password!",
          {
            position: "top-right",
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      } else {
        toast.error("User with this email do not exist!", {
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
    } catch (er) {
      toast.error("Server error!", {
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
  function onChange(value: string | null) {
    setCaptcha(value);
  }

  return (
    <div className="loginPage min-h-screen md:items-center md:flex">
      <Head>
        <title>Reset your password</title>
      </Head>
      <div className="flex md:max-w-[1450px] md:mx-auto mx-5 md:py-5">
        <img
          src="/forgot.png"
          className="object-cover w-72 rounded-tl-md rounded-bl-md hidden md:inline-flex"
          alt="login_image"
        />

        <div className="bg-[#1E1E1E] md:px-7 px-5 rounded-md md:rounded-none md:rounded-tr-md md:rounded-br-md flex flex-col gap-8  items-center  justify-center shadow-lg  w-full py-7 mt-28 md:mt-0 md:py-6 mb-12 md:mb-0 flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
            <h2 className="font-bold text-2xl text-center text-white items-end">
              Forgot Password?
            </h2>

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
            <div className="flex justify-start w-full">
              <ReCAPTCHA
                sitekey="6LcGfNYiAAAAALXVdk9psJDgpo_nUEb6D5RdqW7T"
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className={`${
                session?.user || props.authState
                  ? "bg-gray-500 text-white py-2 font-semibold rounded-md"
                  : "commonButton py-2 font-semibold text-white"
              } `}
              disabled={session?.user || props.authState}
            >
              Login
            </button>
          </form>
          <p className="text-white text-sm">
            You'll receive an email from us to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context: object) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
export default Forgot;
