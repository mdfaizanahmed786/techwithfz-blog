import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../context/userContext";

type Props = {};

const Admin = (props: Props) => {
  const authContext = useContext(userContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  useEffect(() => {
    authContext.isAuthenticated() ? router.push("/admin") : router.push("/");
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const addPost = await fetch("http://localhost:3000/api/addpost", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        blog: {
          title: titleRef.current?.value,
          author: authorRef.current?.value,
          desc: descriptionRef.current?.value,
          slug: slugRef.current?.value,
        },
      }),
    });
    const response=await addPost.json();
     router.push("/")
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-5xl m-auto">
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
        <label htmlFor="title">Title</label>
        <input
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          autoComplete="false"
          minLength={5}
          className="border-2 "
          required
        />
        <label htmlFor="author">Author</label>
        <input
          ref={authorRef}
          type="text"
          name="author"
          id="author"
          autoComplete="false"
          minLength={5}
          className="border-2 "
          required
        />
        <label htmlFor="slug">Slug</label>
        <input
          ref={slugRef}
          type="text"
          name="slug"
          id="slug"
          autoComplete="false"
          minLength={5}
          className="border-2 "
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          ref={descriptionRef}
          name="description"
          id="description"
          autoComplete="false"
          minLength={5}
          className="border-2 "
          required
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default Admin;
