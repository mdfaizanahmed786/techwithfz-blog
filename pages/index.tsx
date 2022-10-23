import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home | TechwithFZ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-green-500">Bismillah</div>
      <div className="flex gap-5">
      <Link href={'/signup'}>Signup</Link>
      <Link href={'/blog'}>Blog</Link>
      <Link href={'/login'}>login</Link>

      </div>
    </div>
  );
};

export default Home;
