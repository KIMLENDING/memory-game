"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const MouseLight = () => {
    const lightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveLight = (e: MouseEvent) => {
            gsap.to(lightRef.current, {
                x: e.clientX - 150, // 마우스 위치 중심 정렬
                y: e.clientY - 150,
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
            className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-50"
            style={{
                background: "radial-gradient(circle, rgba(255, 255, 150, 0.8) 20%, rgba(255, 255, 150, 0.3) 50%, rgba(255, 255, 150, 0) 80%)",
                mixBlendMode: "lighten", // 배경을 밝히는 효과
                borderRadius: "50%",
                filter: "blur(40px)", // 빛이 퍼지는 느낌
            }}
        />
    );
};

export default MouseLight;
