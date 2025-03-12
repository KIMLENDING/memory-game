
'use client'
import Hero from '@/components/portfolio/Hero'
import MouseLight from '@/components/portfolio/MouseLight'
import MouseReversal from '@/components/portfolio/MouseReversal'
import SignatureAnimation from '@/components/portfolio/SignatureAnimtion'
import ParticlesBG from '@/components/portfolio/ParticlesBG'


import Intro from '@/components/portfolio/Intro'
import { useMediaQuery } from '@/hooks/use-media-query'


const page = () => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <section className='flex flex-col items-center justify-center min-h-screen w-screen relative '>
            {/** 배경 효과 */}
            <ParticlesBG />
            <Intro />
            {/** 마우스 포인터 */}
            {isDesktop && (
                <>
                    <MouseReversal />
                    <MouseLight />
                </>
            )}
            <div className='relative w-screen h-fit  text-white  '>
                <Hero /> {/* Hero 컴포넌트의 높이 만으로 부모 요소의 h값이 결정됨  */}

                <section id='project' className='min-h-screen w-full py-24 px-10 border-2 border-red-400 bg-blend-difference '>프로젝트</section>
                <section id='skill' className='min-h-screen w-full py-24 px-10 border-2 border-red-400'>기술</section>
                <section id='about' className='min-h-screen w-full py-24 px-10 border-2 border-red-400'>연락</section>
            </div>
        </section>
    )
}

export default page