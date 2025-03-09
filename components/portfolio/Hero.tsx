'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import GravityWithBounce from './GravityWithBounce';

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const textRef2 = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            heroRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 1.0, ease: "power2.out" }
        );
        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power2.out" }
        );
        gsap.fromTo(
            textRef2.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 2, ease: "power2.out" }
        );
        gsap.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, delay: 2.5, ease: "power2.out" }
        );
    }, []);


    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative h-[50vh] lg:min-h-screen w-full flex flex-col items-start  justify-end text-center py-4 px-6 gap-5 "
        >
            < GravityWithBounce />

        </section>
    );
};

export default Hero;