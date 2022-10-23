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
type Props = Response[]

const Blog  = (props:Props) => {
    const {allBlogs}=props;

  return (
    <div>
      {allBlogs.map((blog:Response)=>(
        <div key={blog._id}>
             <h2 className='font-bold'><Link href={`blogpost/${blog.slug}`}>{blog.title}</Link></h2>
             <p>{blog.desc}</p>

        </div>

      ))}
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


