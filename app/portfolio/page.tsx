
'use client'
import Hero from '@/components/portfolio/Hero'
import MouseLight from '@/components/portfolio/MouseLight'
import MouseReversal from '@/components/portfolio/MouseReversal'
import SignatureAnimation from '@/components/portfolio/SignatureAnimtion'

import Sunrise from '@/components/portfolio/Sunrise'
import MatterComponent from '@/components/portfolio/test'




import React from 'react'

const page = () => {

    return (
        <section className='flex flex-col items-center justify-center min-h-screen w-screen relative bg-white'>
            {/** 마우스 포인터 */}
            <MouseReversal />
            <MouseLight />
            <Sunrise />

            <div className='relative w-screen h-fit border-2  '>
                <Hero /> {/* Hero 컴포넌트의 높이 만으로 부모 요소의 h값이 결정됨  */}
                <SignatureAnimation /> {/* 부모 요소의 범위에서 밀려남  */}
            </div>
            <MatterComponent />
            <section id='project' className='min-h-screen w-full py-24 px-10 border-2 border-red-400 bg-blend-difference'>프로젝트</section>
            <section id='skill' className='min-h-screen w-full py-24 px-10 border-2 border-red-400'>기술</section>
            <section id='about' className='min-h-screen w-full py-24 px-10 border-2 border-red-400'>연락</section>
        </section>
    )
}

export default page