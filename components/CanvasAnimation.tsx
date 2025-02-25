"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CanvasAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseOverRef = useRef(false);
    const hoverStartRef = useRef<number | null>(null);
    const [hoverTime, setHoverTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d"); // 2D 렌더링 컨텍스트 생성
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let x = 200;
        let y = 200;
        let dx = 2;
        let dy = 2;
        const radius = 50;
        let hue = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화

            hue = (hue + 1) % 360;

            // 원 그리기
            ctx.beginPath(); // 새로운 경로 생성
            ctx.arc(x, y, radius, 0, Math.PI * 2, false); // 원 그리기
            const fillColor = mouseOverRef.current ? "green" : `hsl(${hue}, 100%, 50%)`;
            gsap.to(ctx, { duration: 0.5, onUpdate: () => { ctx.fillStyle = fillColor } });
            ctx.fill();
            ctx.closePath();

            // 사각형 그리기
            ctx.beginPath();
            ctx.rect(50, 50, 100, 100);
            // ctx.stroke(); // 테두리만 그리기
            ctx.fillStyle = "blue"; // 사각형의 색상 설정
            ctx.fill(); // 사각형 채우기
            ctx.closePath();


            x += dx;
            y += dy;

            if (x + radius > canvas.width || x - radius < 0) dx = -dx; // x 축 벽에 닿으면 방향 전환
            if (y + radius > canvas.height || y - radius < 0) dy = -dy; // y 축 벽에 닿으면 방향 전환

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
            const isOver = distance < radius;

            if (mouseOverRef.current !== isOver) {
                mouseOverRef.current = isOver;

                if (isOver) {
                    hoverStartRef.current = Date.now();
                    intervalRef.current = setInterval(() => {
                        if (hoverStartRef.current !== null) {
                            const elapsedTime = (Date.now() - hoverStartRef.current) / 1000;
                            setHoverTime(elapsedTime);
                        }
                    }, 100);
                } else {
                    if (hoverStartRef.current !== null) {
                        clearInterval(intervalRef.current!);
                        console.log(`마우스가 ${hoverTime.toFixed(2)}초 동안 원 위에 있었습니다.`);
                        hoverStartRef.current = null;
                    }
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []); // 🚀 useEffect가 처음 한 번만 실행되도록 설정
    return (
        <section className=" w-full h-full relative bg-white ">
            <canvas ref={canvasRef} className=" w-full h-full " />
            <h1 className="absolute top-10 left-10 text-black text-4xl ">Next.js Canvas 애니메이션</h1>
            <div className="absolute top-5 left-5 text-white text-lg bg-black px-4 py-2 rounded-lg">
                마우스 유지 시간: {hoverTime.toFixed(2)}초
            </div>
        </section>
    )
};

export default CanvasAnimation;
