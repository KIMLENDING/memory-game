import React, { use, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Doto } from 'next/font/google';
import Link from 'next/link';

const doto = Doto({ weight: ['600', '800'], subsets: ['latin'] });
const Intro = () => {
    const devRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    useEffect(() => {
        // 화면의 높이
        const vh = window.innerHeight;
        // 애니메이션을 실행하기 위해 DOM이 로드되었을 때 실행
        gsap.timeline({
            onComplete: () => {
                const devSpan = devRef.current?.querySelectorAll('span');
                if (!devSpan) return;
                const devSpanArray = Array.from(devSpan).slice(0, -1);
                gsap.timeline()
                    .fromTo(devSpanArray, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 })
                    .fromTo(devSpan[devSpan.length - 1], { opacity: 0, y: 10 }, { opacity: 1, y: -20, duration: 0.8, repeat: -1, yoyo: true, ease: 'power2.out' });
            },
        })
            // f,r,o,n,t,-,e,n,d 애니메이션
            .fromTo("#t1", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5, delay: 0.2 })
            .fromTo("#t3", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .fromTo("#t5", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .fromTo("#t7", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .fromTo("#t9", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
            .fromTo("#t2", { y: vh / 2, opacity: 0 }, { yPercent: 10, opacity: 1, duration: 0.5, delay: 0.5 }, '-=0.5')
            .fromTo("#t4", { y: vh / 2, opacity: 0 }, { yPercent: 10, opacity: 1, duration: 0.5 }, '-=0.5')
            .fromTo("#t6", { y: vh / 2, opacity: 0 }, { yPercent: 10, opacity: 1, duration: 0.5 }, '-=0.5')
            .fromTo("#t8", { y: vh / 2, opacity: 0 }, { yPercent: 10, opacity: 1, duration: 0.5 }, '-=0.5')
            // 커튼 열기
            .to('#커튼', { yPercent: -100, duration: 0.8, delay: 0.5 })
            // r,n,-,n 애니메이션션
            .to("#t2", { yPercent: 0, opacity: 1, y: 0, duration: 0.5 }, '-=0.8')
            .to("#t4", { yPercent: -10, opacity: 1, y: 0, duration: 0.5 }, '-=0.8')
            .to("#t6", { yPercent: 10, opacity: 1, y: 0, duration: 0.5 }, '-=0.8')
            .to("#t8", { yPercent: 10, opacity: 1, y: 0, duration: 0.5 }, '-=0.8')
            // 텍스트 컬러 변경 흰색으로로
            .to("#t1", { duration: 0.5, color: '#ffffff' }, '-=0.4')
            .to("#t2", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#t3", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#t4", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#t5", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#t6", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#t7", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#t8", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            .to("#t9", { duration: 0.5, color: '#ffffff' }, '-=0.5')
            // 텍스트 컬러 변경 그린으로
            .to("#t1", { duration: 0.5, color: '#00ff00', delay: 0.5 }, '-=0.4') // Green
            .to("#t2", { duration: 0.5, color: '#32cd32' }, '-=0.4') // LimeGreen
            .to("#t3", { duration: 0.5, color: '#3cb371' }, '-=0.4') // MediumSeaGreen
            .to("#t4", { duration: 0.5, color: '#2e8b57' }, '-=0.4') // SeaGreen
            .to("#t5", { duration: 0.5, color: '#228b22' }, '-=0.4') // ForestGreen
            .to("#t6", { duration: 0.5, color: '#006400' }, '-=0.4') // DarkGreen
            .to("#t7", { duration: 0.5, color: '#00ff7f' }, '-=0.4') // SpringGreen
            .to("#t8", { duration: 0.5, color: '#00fa9a' }, '-=0.4') // MediumSpringGreen
            .to("#t9", { duration: 0.5, color: '#7fff00' }, '-=0.4') // Chartreuse

    }, []);

    useEffect(() => {
        // 텍스트 애니메이션 (위로 올라가고 사라지기 아래에서 나타나기기) 반복
        if (!textRefs.current.length) return;
        gsap.set(textRefs.current, { opacity: 0, y: 50, });
        const timeline = gsap.timeline({ repeat: -1, delay: 4 }); // 무한 반복
        textRefs.current.forEach((text) => {
            timeline.to(text, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
            }).to(text, {
                opacity: 0,
                y: -50,
                duration: 1,
                ease: 'power2.in',
                delay: 3
            });
        });
    }, []);

    useEffect(() => {
        // GitHub 링크 애니메이션
        const github = document.getElementById('github');
        if (!github) return;
        gsap.set(github, { opacity: 0, y: 50 });

        gsap.to(github, { opacity: 1, y: 0, duration: 1, delay: 5, ease: 'power2.out' });
    }, []);


    return (
        <section id='intro' className='w-full min-h-screen relative flex flex-col items-center text-black transparent pointer-events-none '>
            <div id='커튼' className='absolute top-0 left-0 flex flex-col w-full min-h-screen bg-green-500 ' />
            <div className="mt-20 flex justify-center w-full gap-2 md:gap-4 px-4 ">
                <span id="t1" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 20vh)', }}>F</span>
                <span id="t2" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 20vh)', }}>r</span>
                <span id="t3" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 20vh)', }}>o</span>
                <span id="t4" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 20vh)', }}>n</span>
                <span id="t5" className={`font-semibold ${doto.className} `} style={{ fontSize: 'clamp(1rem, 12vw, 20vh)', }}>t</span>
                <span id="t6" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 20vh)', }}>-</span>
                <div id="t7" className='flex flex-col  relative opacity-0'>
                    <span className={`font-semibold ${doto.className} `} style={{ fontSize: 'clamp(1rem, 12vw, 20vh)', }}>E</span>
                    <div ref={devRef} id='dev' className={`flex flex-row  absolute left-0 -bottom-4 sm:-bottom-10 font-semibold  ${doto.className} text-yellow-50 text-center `} style={{ fontSize: 'clamp(0.5rem, 5vw, 8vh)' }} >
                        {[...'developer!'].map((char, index) => (
                            <span key={index} className="inline-block opacity-0">{char}</span>
                        ))}
                    </div>
                </div>
                <span id="t8" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 20vh)', }}>n</span>
                <span id="t9" className={`font-semibold ${doto.className}`} style={{ fontSize: 'clamp(1rem, 12vw, 20vh)', }}>d</span>
            </div>
            <div className='relative mt-4 sm:mt-10 p-4 w-full h-full flex-[2] md:flex-1  flex flex-col items-center justify-center pointer-events-auto text-white'>
                <p ref={(el) => { textRefs.current[0] = el }} className="absolute  px-4 opacity-0" style={{ fontSize: 'clamp(1rem, 3vw, 3vh)', }} >
                    <span>웹을 그저 </span>
                    <span className='sm:text-3xl text-xl text-[#00ff00] text-nowrap  '>보는 것</span>
                    <span >이 아닌, </span>
                    <span className='sm:text-3xl text-xl text-[#00ff00] text-nowrap'>느낄 수 있는 경험</span>
                    <span>으로 만들고 싶습니다.</span>
                </p>
                <p ref={(el) => { textRefs.current[1] = el }} className="absolute  px-4 opacity-0" style={{ fontSize: 'clamp(1rem, 3vw, 3vh)', }}>
                    작은 움직임 하나까지 고민하며,
                    더 좋은 <span className='sm:text-3xl text-xl text-[#00ff00] text-nowrap'>사용자 경험</span>을 고민하는 개발자가 되겠습니다.</p>
            </div>
            <div className='flex flex-col flex-1 pointer-events-auto  '>



                <Link id='github' href={'https://github.com/KIMLENDING'}
                    className={`  text-[#32cd32] opacity-0 relative py-2 px-4 transition-all ease-in-out duration-300 
                    hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-black 
                    after:transition-all after:ease-in-out after:duration-300 after:mix-blend-difference hover:after:h-full ${doto.className} after:rounded-lg`}
                    style={{ fontSize: 'clamp(3rem, 5vw, 8vh)' }}
                >
                    GitHub
                </Link>


            </div>
        </section>
    )
}

export default Intro
