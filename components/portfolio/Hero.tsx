'use client';
import React, { use, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const textRef2 = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            heroRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
        );
        gsap.fromTo(
            textRef2.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" }
        );
        gsap.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, delay: 1.5, ease: "power2.out" }
        );
    }, []);
    useEffect(() => {
        if (!textRef2.current) return;

        const popImage = (textRef2.current as HTMLElement).querySelectorAll('div');
        console.log(popImage)

    }, []);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative h-[50vh] lg:min-h-screen w-full flex flex-col items-start  justify-end text-center py-4 px-6 gap-5 "
        >

            <div className='w-full flex flex-col text-start break-keep break-words text-softGray2 text-xl sm:text-3xl font-semibold space-y-1' ref={textRef}>
                <p >
                    안녕하세요!
                </p>
                <p>
                    빠른 프로토타이핑과
                </p>
                <p >
                    지속적인 개선을 추구하고 발전하는 개발자
                </p>
            </div>
            <div className='w-full flex flex-col sm:flex-row text-start break-keep break-words text-softGray2 text-3xl font-semibold pb-4' ref={textRef2}>
                <div className='flex flex-row justify-start items-end text-center'>
                    <div className=" -mx-2 font-bold text-gray-800 text-7xl sm:text-9xl lg:text-12xl ">
                        <div id='name' className='relative'>
                            김계관
                            <div id='pop-image' className='max-lg:hidden absolute w-full bottom-0 flex flex-row justify-between items-center '>
                                <div className='flex-1  bottom-0 opacity-0 hover:opacity-100 hover:scale-110 transition rotate-6'>
                                    <Image height={500} width={500} alt='img' src={'/Hyacine.webp'} className='rounded-3xl'></Image>
                                </div>
                                <div className='flex-1  opacity-0 hover:opacity-100 hover:scale-110 transition rotate-12'>
                                    <Image height={1000} width={1000} alt='img' src={'/Castorice.webp'} className='rounded-3xl'></Image>
                                </div>
                                <div className='flex-1 opacity-0 hover:opacity-100 hover:scale-110 transition -rotate-12'>
                                    <Image height={1000} width={1000} alt='img' src={'/Tribbie3.webp'} className='rounded-3xl'></Image>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:pb-10 '>입니다. </div>
                </div>
            </div>

            {/* <a
                ref={buttonRef}
                href="#project"
                className="mt-6 px-8 py-4 bg-primary text-white text-xl font-semibold rounded-full shadow-lg hover:scale-105 transition"
            >
                프로젝트 보러가기 🚀
            </a> */}
        </section>
    );
};

export default Hero;