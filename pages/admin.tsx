import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";



const Admin = () => {
const [values, setValues]=useState({
    email:'',
    password:'',
    title:'',      
    author:'',
    slug:'',
    category:'',
  })
  const [value, setValue] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { email, password, title, author, slug } = values;
      const addPost = await fetch("http://localhost:3000/api/addpost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          blog: {
            title,
            author,
            desc: value,
            slug
          },
        }),
      });
      const response = await addPost.json();
      if (response.createdAt) {
        toast.success("Success while adding your post!", {
          position: "top-right",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push("/blog");
      } else {
        toast.error("You are not authorized!", {
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
      toast.error("An error occurred while posting your data!", {
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
    <div className="adminPage text-white">
      <Head>
        <title>Admins Only</title>
      </Head>
      <div className="max-w-[700px] mx-auto space-y-5 p-12">
        <h2 className="font-semibold text-4xl text-white">Admin Panel </h2>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
            value={values.email}
                type="email"
                name="email"
                id="email"
                minLength={7}
                autoComplete="false"
                className="bg-[#2E2E2E] px-5 py-3 rounded-md outline-none text-white border-[#10935F] border-2"
                required
                placeholder="Enter you admin email"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"

                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
              value={values.password}
                type="password"
                name="password"
                id="password"
                autoComplete="false"
                minLength={5}
                className="bg-[#2E2E2E] px-5 py-3 rounded-md outline-none text-white border-[#10935F] border-2"
                required
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="title">Title</label>
              <input
             value={values.title}
                type="text"
                name="title"
                id="title"
                autoComplete="false"
                minLength={5}
                className="bg-[#2E2E2E] px-5 py-3 rounded-md outline-none text-white border-[#10935F] border-2"
                required
                placeholder="Enter blog title"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="author">Author</label>
              <input
                value={values.author}
                type="text"
                name="author"
                id="author"
                autoComplete="false"
                minLength={5}
                className="bg-[#2E2E2E] px-5 py-3 rounded-md outline-none text-white border-[#10935F] border-2"
                required
                placeholder="Author Name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="slug">Slug</label>
              <input
             value={values.slug}
                type="text"
                name="slug"
                id="slug"
                autoComplete="false"
                minLength={5}
                className="bg-[#2E2E2E] px-5 py-3 rounded-md outline-none text-white border-[#10935F] border-2"
                required
                placeholder="how-to-add-slug"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="category">Category</label>
              <input
             value={values.category}
                type="text"
                name="category"
                id="category"
                autoComplete="false"
                minLength={5}
                className="bg-[#2E2E2E] px-5 py-3 rounded-md outline-none text-white border-[#10935F] border-2"
                required
                placeholder="Database..."
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Description:</p>
              <div className="bg-black !text-white border-[#10935F] border-2 rounded-md ">
                <ReactQuill
                  value={value}
                  onChange={setValue}
                  className="!text-white"
                  
                />
              </div>
            </div>

            <button
              type="submit"
              className="commonButton py-2 font-semibold text-white w-32"
            >
              Add Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
