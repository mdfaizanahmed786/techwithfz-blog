import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'

type Props = {}

const Login = (props: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router=useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    
    e.preventDefault();
    const getUser = await fetch("http://localhost:3000/api/getuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
  
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });
    const response = await getUser.json();
    router.push("/")
    localStorage.setItem("auth", JSON.stringify(response));

  };
  return (
    <div className='loginPage h-screen items-center  flex'>
      <Head>
  <title>Login | techWithFZ</title>
      </Head>
      <div className='flex max-w-[1450px] mx-auto h-[32rem]'>
      <div className='imageContainer flex-[0.45]'>
        <img src="/login.png" className='object-cover h-full rounded-tl-md rounded-bl-md' alt="login_image" />

      </div>
       <div className='bg-[#1E1E1E] px-7 rounded-tr-md rounded-br-md flex flex-col gap-8  items-center flex-[0.55] justify-center shadow-lg'>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
        <h2 className='font-bold text-2xl text-center text-white'>Login</h2>
        <div className='flex flex-col gap-1'>

        <label htmlFor="email" className='font-semibold text-white'>Email</label>
        <input
          ref={emailRef}
          type="email"
          name="email"
          id="email"
          minLength={7}
          autoComplete="false"
          className="bg-[#2E2E2E] px-5 py-2 rounded-md outline-none text-white  border-[#10935F] border-2"
          required
          placeholder='Enter your email'
        />
        </div>
        <div className='flex flex-col gap-1'>
          
        <label htmlFor="password" className='font-semibold text-white'>Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          id="password"
          autoComplete="false"
          minLength={5}
          className="bg-[#2E2E2E] px-2 py-2 rounded-md outline-none  text-white border-[#10935F] border-2"
          required
          placeholder='Enter your password'
        />
        </div>
        <button type="submit" className='commonButton py-2 font-semibold text-white'>Login</button>
      </form>
      <p className='text-white text-sm'>Not a registered user? <Link href="/signup"><span className='textStyle font-bold cursor-pointer'>Signup</span></Link></p>
       </div>
      </div>
    </div>
  );
}

export default Login