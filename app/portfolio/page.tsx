
'use client'
import Hero from '@/components/portfolio/Hero'
import MouseLight from '@/components/portfolio/MouseLight'
import SignatureAnimation from '@/components/portfolio/SignatureAnimtion'

import Sunrise from '@/components/portfolio/Sunrise'
import { useMediaQuery } from '@/hooks/use-media-query'
import React from 'react'

const page = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return (
        <section className='flex flex-col items-center justify-center min-h-screen w-screen relative'>
            {isDesktop && <MouseLight />}
            <Sunrise />
            <div className='relative w-screen '>
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