import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { Doto } from 'next/font/google';
import GravityWithBounce from './GravityWithBounce';
const doto = Doto({ weight: '800', subsets: ['latin'] });
const Intro = () => {
    useEffect(() => {
        const disableScroll = () => {
            document.body.style.overflow = 'hidden'; // 스크롤 비활성화
        };
        const enableScroll = () => {
            document.body.style.overflow = 'auto'; // 스크롤 활성화
        };
        // 애니메이션을 실행하기 위해 DOM이 로드되었을 때 실행
        gsap.timeline({
            onStart: disableScroll,  // 애니메이션 시작 시 스크롤 비활성화
            onComplete: enableScroll, // 애니메이션 종료 시 스크롤 활성화
        })
            .fromTo("#p", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5, delay: 0.2 })
            .fromTo("#o1", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .fromTo("#f", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .fromTo("#i", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .fromTo("#o3", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5, }, '-=0.5')
            .fromTo("#r", { yPercent: 100, opacity: 0 }, { yPercent: 50, opacity: 1, y: 0, duration: 0.5, delay: 0.5 }, '-=0.5')
            .fromTo("#t", { yPercent: 100, opacity: 0 }, { yPercent: 50, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .fromTo("#o2", { yPercent: 100, opacity: 0 }, { yPercent: 50, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .fromTo("#l", { yPercent: 100, opacity: 0 }, { yPercent: 50, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .to('#커튼', { y: '-100%', duration: 1, delay: 0.5 })
            .to("#r", { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.8')
            .to("#t", { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.8')
            .to("#o2", { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.8')
            .to("#l", { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.8')

            .to("#p", { duration: 0.5, color: '#ffffff' }, '-=0.4')
            .to("#o1", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#r", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#t", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#f", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#o2", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#l", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#i", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#o3", { duration: 0.5, color: '#ffffff' }, '-=0.5')

    }, []);

    return (
        <section id='intro' className='w-full min-h-screen relative flex flex-col items-center text-black transparent '>
            <div id='커튼' className='absolute top-0 left-0 flex flex-col w-full min-h-screen bg-green-300' />
            <div className="mt-16 flex justify-center w-full  gap-2 md:gap-4  px-4 pointer-events-none">
                <span id="p" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 30vh)' }}>P</span>
                <span id="o1" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 30vh)' }}>o</span>
                <span id="r" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 30vh)' }}>r</span>
                <span id="t" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 30vh)' }}>t</span>
                <span id="f" className={`font-semibold ${doto.className} `} style={{ fontSize: 'clamp(1rem, 12vw, 30vh)' }}>f</span>
                <span id="o2" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 30vh)' }}>o</span>
                <span id="l" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 30vh)' }}>l</span>
                <span id="i" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 30vh)' }}>i</span>
                <span id="o3" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 30vh)' }}>o</span>
            </div>
            <div className='flex-1 w-full h-full flex items-center justify-center'>

                <div className='max-w-[300px] max-h-[300px] w-full h-full flex items-center justify-center'>
                    <GravityWithBounce />
                </div>
            </div>
        </section>
    )
}

export default Intro
