import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSession, signIn, getProviders} from "next-auth/react"
import ReCAPTCHA from "react-google-recaptcha";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Image from "next/image";
interface Auth{
  
  callbackUrl:string
  id:string
  name:string
  signinUrl:string
  type:string
}
interface GoogleAuth{
  google:Auth
}
type Props = {
  authState:boolean
  providers:GoogleAuth
}


const Signup = (props: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [captcha, setCaptcha]=useState<string| null>("")
  const {data}=useSession();
  const session:any=data;
  const loginWithGoogle:any=signIn
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try{
      if(!captcha){
        toast.error('Invalid captcha', {
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

      const addUser = await fetch("https://techwithfz.vercel.app/api/createuser", {
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
      if(response.success && captcha){
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
  const authSignin=()=>{

    loginWithGoogle(props.providers.google.id)
  if(session)
 
  toast.success('Singup Success!', {
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
  function onChange(value:string|null) {
    setCaptcha(value)
  }
  
  return (
    <div className="bg-[#2E2E2E] min-h-screen md:items-center md:flex">
      <Head>
        <title>SignUp - TechWithFZ</title>
      </Head>
      <div className="flex md:max-w-[1450px] md:mx-auto mx-5 md:py-5">
        <div className="imageContainer md:flex-[0.45] hidden md:inline-flex">
        <Image src="/signup.png" className='object-cover h-full rounded-tl-md rounded-bl-md' alt="login_image" width={500} height={900} />
        </div>
        <div className="bg-[#1E1E1E] md:px-7 px-5 rounded-md md:rounded-none md:rounded-tr-md md:rounded-br-md flex flex-col gap-7  items-center md:flex-[0.55] justify-center shadow-lg  w-full py-7 mt-16 md:mt-0 md:py-6 mb-12 md:mb-0 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
              <h2 className="font-bold text-2xl text-center text-white">
                SignUp
              </h2>
        
              <div className='google bg-white flex gap-6 text-black justify-center items-center rounded-md py-1 px-2 cursor-pointer border-blue-500 border-2' onClick={authSignin}>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="google_logo" className='h-10 w-10' />
             <p className='text-lg'>Signup with {props.providers.google.name}</p>
        </div>

        <div className="flex w-full items-center gap-2">
  <div className="bg-white w-4 h-[0.5px] opacity-20 flex-1"/>
  <p className="text-sm textStyle font-bold">or</p>
  <div className="bg-white w-4 h-[0.5px] opacity-20 flex-1"/>

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
              <div className="bg-[#2E2E2E] py-2 px-2 items-center rounded-md outline-none  text-white border-[#10935F] border-2 flex ">
                <input
                  ref={passwordRef}
                  type={`${show ? "text": "password"}`}
                  name="password"
                  id="password"
                  autoComplete="false"
                  minLength={5}
                  className="bg-[#2E2E2E] px-2  rounded-md outline-none  text-white flex-1"
                  required
                  placeholder="Enter your password"
                />
                <div>
                  {show ? (
                    <BsEyeSlash onClick={() => setShow(false)} className="cursor-pointer" size={27} title="Hide password"/>
                  ) : (
                    <BsEye onClick={() => setShow(true)} className="cursor-pointer" size={27} title="Show password"/>
                  )}
                </div>
              </div>
            </div>
            <div className='flex justify-center w-full'>
        <ReCAPTCHA
      sitekey="6LcGfNYiAAAAALXVdk9psJDgpo_nUEb6D5RdqW7T"
   
    onChange={onChange}
  />
  </div>
            <button type="submit" className={`${session?.user  ?  "bg-gray-500 text-white py-2 font-semibold rounded-md" : "commonButton py-2 font-semibold text-white"} `} disabled={session?.user}>Signup</button>
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
export async function getServerSideProps(context:object) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default Signup;
