import Hero from '@/components/portfolio/Hero'
import MouseLight from '@/components/portfolio/MouseLight'
import SignatureAnimation from '@/components/portfolio/SignatureAnimtion'

import Sunrise from '@/components/portfolio/Sunrise'
import React from 'react'

const page = () => {
    return (
        <section className='flex flex-col items-center justify-center min-h-screen relative'>
            <MouseLight />
            <Sunrise />
            <div className='relative w-full h-fit'>

                <Hero />
                <SignatureAnimation />
            </div>
            <section id='project' className='min-h-screen w-full py-24 px-10 '>프로젝트</section>
            <section id='skill' className='min-h-screen w-full py-24 px-10 '>기술</section>
            <section id='about' className='min-h-screen w-full py-24 px-10 '>연락</section>
        </section>
    )
}

export default page