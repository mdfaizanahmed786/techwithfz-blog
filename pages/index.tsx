import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import HeroSection from "../components/HeroSection";
import SinglePost from "../components/SinglePost";
interface Response {
  _id: string;
  title: string;
  author: string;
  desc: string;
  slug: string;
  imgs: string;
  createdAt: string;
 
  __v: number;
}
type Props = Response[] | any;

const Home: NextPage = (props: Props) => {
  const { allBlogs } = props;
  return (
    <div>
      <Head>
        <title>Home - TechwithFZ</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Welcome to our blog where the tech gets covered with ease." />
      </Head>
      <main>
        <section>
          <HeroSection />
        </section>
        <section className="bg-[#2E2E2E] py-5 px-2 md:p-12 ">
          <div className="md:max-w-[1430px] md:mx-auto px-4">
            <p className="text-white font-semibold text-2xl md:py-4 py-3 text-center md:text-left">Recent Posts</p>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-24 md:mt-10 mt-3">
              {allBlogs.slice(0, 3).map((blog: Response, i:number) => (
                <SinglePost
                  id={blog._id}
                  key={blog._id}
                  slug={blog.slug}
                  title={blog.title}
                  desc={blog.desc}
                  createdAt={blog.createdAt.slice(0,10)}
                  imgs={`main${i+1}`}
                  
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const response = await fetch("https://techwithfz.vercel.app/api/getposts");
  const { allBlogs } = await response.json();

  return {
    props: { allBlogs },
  };
}

export default Home;
