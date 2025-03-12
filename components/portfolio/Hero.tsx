'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import GravityWithBounce from './GravityWithBounce';


const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);

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


    }, []);


    return (
        <section
            ref={heroRef}
            id="hero"
            className="flex flex-col items-center w-full justify-center min-h-screen px-4 sm:px-6 lg:px-8 border-2 border-red-300"
        >


            <div className='max-w-[300px] max-h-[300px] w-full h-full flex items-center justify-center'>
                <GravityWithBounce />
            </div>

        </section>
    );
};

export default Hero;