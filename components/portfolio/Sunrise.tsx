"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SunriseEffect = () => {
    const bgRef = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline();
        // 2️⃣ 배경 색상이 점점 밝아지는 애니메이션 (어둠 걷어내기)
        tl.to(
            bgRef.current,
            {
                background:
                    "linear-gradient(to bottom, #ffb347, #ffcc33, #ffffff)", // 밤 → 아침
                duration: 3,
                ease: "power2.out",
            },
            // "-=3" // 3초 뒤에 동시 진행
        );


    }, []);

    return (
        <div
            ref={bgRef}
            className="absolute top-0 w-full h-screen flex items-end justify-center transition-all  "
            style={{
                background: "linear-gradient(to top, #020024, #090979, #00d4ff)", // 초기 밤하늘 배경
            }}
        >

        </div>
    );
};

export default SunriseEffect;
