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
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <label htmlFor="email">Email</label>
        <input
          ref={emailRef}
          type="email"
          name="email"
          id="email"
          minLength={7}
          autoComplete="false"
          className="border-2 "
          required
        />
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          id="password"
          autoComplete="false"
          minLength={5}
          className="border-2 "
          required
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login