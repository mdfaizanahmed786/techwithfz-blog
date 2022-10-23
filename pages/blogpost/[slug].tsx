import { useRouter } from 'next/router'
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

type Props = {}

const slug = (props: Response | any) => {
 const {specificPost}=props;
  
  return (
    <div>
   {
    specificPost.map((blog:Response)=>(
      <div>
        <h1 className='font-bold'>{blog.title}</h1>
        <p>{blog.author}</p> <p>{blog.createdAt}</p>
        <p>{blog.desc}</p>

      </div>
    ))
    
   }
    </div>
  )
}

export async function getServerSideProps(context:any){
  const {params}=context
  console.log(params)
  const response=await fetch("http://localhost:3000/api/getposts")
 const {allBlogs}=await response.json();
  let specificPost=allBlogs.filter((blog:Response)=>{
 
    return blog.slug===params.slug
  })

  return{
    props:{specificPost}
  }
}
export default slug;