
'use client'
import Hero from '@/components/portfolio/Hero'
import MouseLight from '@/components/portfolio/MouseLight'
import SignatureAnimation from '@/components/portfolio/SignatureAnimtion'

import Sunrise from '@/components/portfolio/Sunrise'
import React from 'react'

const page = () => {

    return (
        <section className='flex flex-col items-center justify-center min-h-screen w-screen relative'>
            <MouseLight />
            <Sunrise />
            <div className='relative w-screen h-fit border-2  '>
                <Hero /> {/* Hero 컴포넌트의 높이 만으로 부모 요소의 h값이 결정됨  */}
                <SignatureAnimation /> {/* 부모 요소의 범위에서 밀려남  */}
            </div>
            <section id='project' className='min-h-screen w-full py-24 px-10 border-2 border-red-400'>프로젝트</section>
            <section id='skill' className='min-h-screen w-full py-24 px-10 border-2 border-red-400'>기술</section>
            <section id='about' className='min-h-screen w-full py-24 px-10 border-2 border-red-400'>연락</section>
        </section>
    )
}

export default page