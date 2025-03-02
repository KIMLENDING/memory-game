import Hero from '@/components/portfolio/Hero'
import React from 'react'

const page = () => {
    return (
        <div className=' flex flex-col items-center justify-center min-h-screen'>
            <Hero />
            <section id='project' className='min-h-screen w-full py-24 px-10 '>프로젝트</section>
            <section id='skill' className='min-h-screen w-full py-24 px-10 '>기술</section>
            <section id='about' className='min-h-screen w-full py-24 px-10 '>연락</section>
        </div>
    )
}

export default page