import Head from 'next/head'
import React from 'react'

type Props = {}

const About = (props: Props) => {
  return (
    <div className='loginPage h-screen '>
      <Head>
<title>About Me</title>
      </Head>
      <div className='max-w-[1030px] mx-auto p-12 space-y-3'>
        <h1 className='font-bold text-4xl text-white'>About Me</h1>
        <section className='text-white  mt-2 text-lg leading-8'>
          <h2>Hi, 🤚 I'm Faizan Ahmed</h2>
        I'm currently a student pursuing my BE in Electronics and Communication Engineering. Since I joined college, I have been very much interested in technology and I wanted to know how these things work in real life. On this note, I've started exploring and learning a few technologies like how websites work and by the way, I was very much interested in Web Development. Coming to my point, I learned the basic fundamentals of Web Development which are of course HTML, CSS, and JavaScript. I boosted my learning by building projects on my own and started to explore even more because I could have a hunger to learn new things that fascinated me the most. I learned ReactJS and I was in love with it. Along with it, I learned version control and a few concepts of Linux. To conclude, I'm still learning by building projects and by learning new technologies on daily basis. I would love to share my knowledge by building valuable stuff for your company, looking forward to working with you.
        </section>
      </div>
    </div>
  )
}

export default About