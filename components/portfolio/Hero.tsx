'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
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
            buttonRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, delay: 1, ease: "power2.out" }
        );
    }, []);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="h-screen flex flex-col items-center justify-center text-center px-6"
        >
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div> {/* 여기에 프로필 이미지 또는 아이콘 */}
            <h1 ref={textRef} className="text-5xl font-bold text-gray-800">안녕하세요! </h1>
            <p className="mt-2 text-2xl text-gray-600">프론트엔드 개발자 김계관 입니다.</p>
            <p className="mt-2 text-xl text-gray-600">프론트엔드 개발자 김계관 입니다.</p>
            <a
                ref={buttonRef}
                href="#project"
                className="mt-6 px-6 py-3 bg-primary text-white rounded-full text-lg shadow-md hover:scale-105 transition"
            >
                프로젝트 보러가기 🚀
            </a>
        </section>
    );
};

export default Hero;