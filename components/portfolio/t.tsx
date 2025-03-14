'use client';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const DeveloperText = ({ className }: { className?: string }) => {
    useEffect(() => {
        const split = new SplitType('#devs', { types: 'chars' });
        console.log(split);
        gsap.fromTo(split.chars, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 });
    }, []);

    return (
        <div
            id="devs"
            className={`absolute left-0 -bottom-4 sm:-bottom-10 font-semibold ${className} text-yellow-50 text-center`}
            style={{ fontSize: 'clamp(0.5rem, 5vw, 8vh)' }}
        >
            developer
        </div>
    );
};

export default DeveloperText;
