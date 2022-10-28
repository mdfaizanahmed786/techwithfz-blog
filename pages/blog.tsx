import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
interface Response {
    _id:string
    title:string
    author:string
    desc:string
    slug:string
    imgs:string[]
    createdAt:string
    __v:number
}
type Props = Response[] | any

const Blog  = (props:Props) => {
    const {allBlogs}=props;

  return (
    <div className='loginPage'>
      <Head>
<title>techWithFZ - Blog</title>
      </Head>
      <h1 className='text-3xl text-white font-bold text-center py-5 '>All Blogs ({allBlogs.length})</h1>
<div className='flex flex-col gap-7 py-6 max-w-[1100px] mx-auto'>

      {allBlogs.map((blog:Response)=>(
        <div key={blog._id} className="flex flex-col gap-5 px-9 py-7 rounded-lg shadow-md hover:bg-[#2E2E2E] bg-[#1E1E1E] cursor-pointer transition-all duration-200 hover:shadow-lg">
          <p className='text-xs textStyle font-semibold'>Date: {blog.createdAt.slice(0,10)}</p>
             <h2 className='font-bold text-white text-2xl cursor-pointer hover:text-gray-400 transition-all duration-200 '><Link href={`blogpost/${blog.slug}`}>{blog.title}</Link></h2>
             <p className='text-white'>{blog.desc.slice(0, 200)+"..."}</p>
             <Link href={`blogpost/${blog.slug}`}><button className='commonButton py-2 w-32 font-semibold text-white'>Read More</button></Link>

        </div>

      ))}
</div>
    </div>
  )
}

export async function getServerSideProps(context:any){
    const response=await fetch("http://localhost:3000/api/getposts")
    const {allBlogs}=await response.json();
   
    return{
        props:{allBlogs}
    }
}

export default Blog


