
'use client'

import MouseLight from '@/components/portfolio/layout/MouseLight'
import MouseReversal from '@/components/portfolio/layout/MouseReversal'
import ParticlesBG from '@/components/portfolio/layout/ParticlesBG'
import IntroSection from '@/components/portfolio/Intro'
import SkillSection from '@/components/portfolio/Skill'

const page = () => {

    return (
        <section className='flex flex-col items-center justify-center min-h-screen w-screen relative '>
            {/** 배경 효과 */}
            <ParticlesBG />

            {/** 마우스 포인터 */}
            <MouseReversal />
            <MouseLight />

            <div className='relative w-screen h-fit  text-white  '>
                <IntroSection />
                <SkillSection />
                <section id='project' className='min-h-screen w-full py-24 px-10 border-2 border-red-400 bg-blend-difference '>프로젝트</section>
                <section id='about' className='min-h-screen w-full py-24 px-10 border-2 border-red-400'>연락</section>
            </div>
        </section>
    )
}

export default page