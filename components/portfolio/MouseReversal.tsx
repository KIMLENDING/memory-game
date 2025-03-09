"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";


const MouseReversal = () => {
    const lightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveLight = (e: MouseEvent) => {
            gsap.to(lightRef.current, {
                x: e.clientX - 15, // 마우스 위치 중심 정렬
                y: e.clientY - 15,
                duration: 0.2, // 부드러운 애니메이션
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", moveLight);
        return () => window.removeEventListener("mousemove", moveLight);
    }, []);

    return (

        <div
            ref={lightRef}
            className="fixed top-0 left-0 w-[30px] h-[30px] pointer-events-none  bg-white mix-blend-difference rounded-full z-50 "
        />
    );
};

export default MouseReversal;
