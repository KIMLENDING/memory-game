"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export default function GravityWithBounce() {
    const logoRefs = useRef<SVGImageElement[]>([]);
    const containerRef = useRef<SVGPathElement>(null);

    // ✅ 여러 개의 SVG 아이콘
    const svgImages = [
        "/javascript.svg",
        "/Tailwind.svg",
        "/mongodb.svg",
        "/logo-react.svg",
        "/nextjs.svg",
    ];

    // ✅ Hydration 오류 방지를 위해 상태로 관리 (초기 값은 null)
    const [icons, setIcons] = useState<
        { id: number; src: string; x: number; y: number }[]
    >([]);
    const [isLoad, isLoadSet] = useState(false);
    useEffect(() => {
        // ✅ 클라이언트에서만 실행되도록 `Math.random()` 적용
        setIcons(
            svgImages.map((src, index) => ({
                id: index,
                src,
                x: Math.random() * 200 + 50,
                y: Math.random() * 50 + 50,
            }))
        );
    }, []);

    useEffect(() => {
        if (icons.length === 0) return;
        const logos = logoRefs.current;
        const container = containerRef.current;
        if (!logos || !container) return;

        const containerBounds = container.getBBox();

        logos.forEach((logo) => {
            if (!logo) return;

            if (!isLoad) {
                isLoadSet(true);
                applyGravity(logo, container);
            }
            Draggable.create(logo, {
                type: "x,y",
                bounds: container,
                onDragEnd: function () {
                    !isLoad && isLoadSet(true);
                    applyGravity(logo, container);
                },
            });
        });

        function getRelativePosition(element: SVGGraphicsElement, container: SVGGraphicsElement) {
            const elementRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            return [elementRect.left - containerRect.left, elementRect.top - containerRect.top];
        }

        function applyGravity(element: SVGImageElement, container: SVGGraphicsElement) {
            const [x, y] = getRelativePosition(element, container);
            const iconBounds = element.getBBox();
            const maxDrop = containerBounds.height - iconBounds.height;
            const dropDistance = maxDrop - y - 1;

            gsap.to(element, {
                y: `+=${dropDistance}`,
                delay: isLoad ? 0 : 1,
                duration: 1.2,
                ease: "power2.in",
                onComplete: () => {
                    applyBounce(element);
                },
            });
        }

        function applyBounce(element: SVGImageElement) {
            gsap.to(element, {
                y: "-=15",
                duration: 0.3,
                ease: "power1.out",
                yoyo: true,
                repeat: 1,
            });
        }

    }, [icons, isLoad]);

    return (


        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="300"
            height="300"
            viewBox="0 0 300 300"
        >
            {/* ✅ 컨테이너 크기에 맞게 path의 d 값 수정 */}
            <path
                ref={containerRef}
                id="container"
                d="M30,10 
                H270 
                A20,20 0 0 1 290,30 
                V270 
                A20,20 0 0 1 270,290 
                H30 
                A20,20 0 0 1 10,270 
                V30 
                A20,20 0 0 1 30,10 
                Z"
                // 300x300에 맞게 사각형 그리기
                fill="none"
                stroke="black"
                strokeWidth="5"
            />

            {/* Hydration 오류 방지를 위해 클라이언트에서만 SVG 렌더링 */}
            {icons.length > 0 &&
                icons.map((icon, index) => (
                    <image
                        key={icon.id}
                        ref={(el) => {
                            if (el) logoRefs.current[index] = el;
                        }}
                        href={icon.src}
                        x={icon.x}
                        y={icon.y}
                        width="80"
                        height="80"
                        cursor="grab"
                    />
                ))}
        </svg>


    );
}
