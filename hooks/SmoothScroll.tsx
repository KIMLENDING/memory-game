"use client";

import { useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export default function SmoothScroll({ children }: {
    children: React.ReactNode;
}) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useLenis(({ scroll, limit }) => {
        // 실시간으로 업데이트 (requestAnimationFrame 활용)
        requestAnimationFrame(() => {
            setScrollProgress((scroll / limit) * 100);
        });
    });

    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,
                easing: (t) => 1 - Math.pow(1 - t, 3),
                lerp: 0.15,
                wheelMultiplier: 2.8,
                touchMultiplier: 2.2,
            }}
        ><div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
                <div
                    className="h-full bg-green-500 transition-none"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
            {children}
        </ReactLenis>
    );
}
