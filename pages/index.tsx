import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import SinglePost from "../components/SinglePost";
interface Response {
  _id: string;
  title: string;
  author: string;
  desc: string;
  slug: string;
  imgs: string[];
  createdAt: string;
  __v: number;
}
type Props = Response[] | any;

const Home: NextPage = (props: Props) => {
  const { allBlogs } = props;
  return (
    <div>
      <Head>
        <title>Home | TechwithFZ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <HeroSection />
        </section>
        <section className="bg-[#2E2E2E] p-12">
          <div className="max-w-[1430px] mx-auto px-4">
            <p className="text-white font-semibold text-2xl py-4">Recent Posts</p>
            <div className="grid grid-cols-3 gap-24 mt-10">
              {allBlogs.slice(0, 3).map((blog: Response) => (
                <SinglePost
                  id={blog._id}
                  key={blog._id}
                  slug={blog.slug}
                  title={blog.title}
                  desc={blog.desc}
                  createdAt={blog.createdAt.slice(0,10)}
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
  const response = await fetch("http://localhost:3000/api/getposts");
  const { allBlogs } = await response.json();

  return {
    props: { allBlogs },
  };
}

export default Home;
