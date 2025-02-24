// export default Page;
'use client'
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function FloatingCircles() {
    const containerRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // 클라이언트에서만 실행되도록 설정
    }, []);

    useEffect(() => {
        if (!mounted) return; // 서버에서는 실행되지 않도록 방지

        const circles = gsap.utils.toArray(".circle") as HTMLElement[];
        circles.forEach((circle) => {
            const container = containerRef.current;
            if (!container) return;
            const containerWidth = (container as HTMLElement).offsetWidth;
            const containerHeight = (container as HTMLElement).offsetHeight;

            gsap.to(circle, {
                motionPath: { // 움직일 path 설정
                    path: [
                        { x: 0, y: 0 },
                        { x: (containerWidth - 384) * 0.2, y: (containerHeight - 384) * 0.3 },
                        { x: (containerWidth - 384) * 0.6, y: 0 },
                        { x: containerWidth - 384, y: containerHeight - 384 }, // 오른쪽 아래 끝 지점 (384는 circle의 지름)
                        { x: (containerWidth - 384) * 0.6, y: (containerHeight - 384) * 0.7 },
                        { x: (containerWidth - 384) * 0.3, y: (containerHeight - 384) },
                        { x: (containerWidth - 384) * 0, y: (containerHeight - 384) * 0.8 },
                        { x: (containerWidth - 384) * 0.1, y: (containerHeight - 384) * 0.3 },
                        { x: 0, y: 0 },
                    ],
                    curviness: 1.5, // 곡선의 곡률
                    autoRotate: false, // 움직일 때 회전하지 않도록 설정
                },
                duration: gsap.utils.random(10, 15),
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        });
    }, [mounted]);

    if (!mounted) return null; // 서버 렌더링 시 아무것도 반환하지 않음

    return (
        <div ref={containerRef} className=" h-screen relative bg-black overflow-hidden text-white">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="circle absolute top-0 left-0 w-96 h-96 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full opacity-50 blur-2xl
                        ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-blue-400' : 'bg-green-400'}`}
                    />
                    <div className="absolute">안녕</div>
                </div>
            ))}
        </div>
    );
}
