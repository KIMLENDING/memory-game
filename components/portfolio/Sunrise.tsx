"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SunriseEffect = () => {
    const bgRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // 1️⃣ 새 배경(아침)을 서서히 나타나게 함
        tl.to(overlayRef.current, {
            opacity: 1, // 서서히 나타남
            duration: 1.5,
            ease: "power1.out",
        });
    }, []);

    return (
        <div className="absolute top-0 w-full min-h-screen -z-0">
            {/* 기존 밤 배경 */}
            <div
                ref={bgRef}
                className="absolute top-0 w-full h-full"
                style={{
                    background: "linear-gradient(to top, #020024, #090979, #00d4ff)", // 밤 배경
                }}
            />

            {/* 새로운 아침 배경 (서서히 등장) */}
            <div
                ref={overlayRef}
                className="absolute top-0 w-full h-full opacity-0 transition-all"
                style={{
                    background:
                        "linear-gradient(to bottom, #005900 , #43ba43 ,#adffad, #adffad )", // 아침 배경
                }}
            />
        </div>
    );
};

export default SunriseEffect;
