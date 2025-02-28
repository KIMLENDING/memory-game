"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 *  속도 벡터의 기본 개념
 *  speed = √(vx² + vy²) 
 *  속도를 벡터의 방향(각도)와 분리해서 표현하면 다음과 같다.
 *  vx = speed * cos(angle)
 *  vy = speed * sin(angle)
 *  여기서 angle은 x축과 이루는 각도이다.(0 ~ 2π) 공의 이동 방향을 결정한다.
 *  atan2(y, x) 함수를 사용하면 x, y 좌표를 입력받아 x축과의 각도를 계산할 수 있다.
 *  이를 통해 
 * 
 * 충돌 후 방향 변경
 * 1. 벽 충돌 감지 - x, y 좌표가 캔버스의 경계를 벗어나면 충돌로 판단
 * 2. 충돌 시 속도의 x, y 방향 성분을 반대로 변경 (반사) 부호 변경
 * 3. 랜덤한 각도를 더해 방향을 변경 (랜덤 반사) applyRandomBounce 함수
 * 4. 새로운 속도의 x, y 방향 성분 계산
 * 5. 새로운 속도로 공 이동
 * 6. 반복
 */

const CanvasAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseOverRef = useRef(false);
    const hoverStartRef = useRef<number | null>(null);
    const [hoverTime, setHoverTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [speed, setSpeed] = useState(2); // 원의 속도


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d"); // 2D 렌더링 컨텍스트 생성
        if (!ctx) return;
        let animationFrameId: number; // 애니메이션 프레임 ID
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let x = canvas.width / 2; // 원의 초기 x 좌표
        let y = canvas.height / 2; // 원의 초기 y 좌표
        const radius = 50;
        let angle = Math.random() * Math.PI * 2; // 초기 랜덤 방향
        let hue = 0; // 색상 값


        let vx = speed * Math.cos(angle); // x 방향 속도
        let vy = speed * Math.sin(angle); // y 방향 속도

        function applyRandomBounce() {
            let randomAngle = (Math.random() - 0.5) * (Math.PI / 3); // ±60도 범위의 랜덤 값
            let newAngle = Math.atan2(vy, vx) + randomAngle; //(vx, vy)가 x축과 이루는 각도 + 랜덤각도 = 새로운 각도

            vx = speed * Math.cos(newAngle);
            vy = speed * Math.sin(newAngle);
        }
        function updateBall() {
            x += vx;
            y += vy;
            if (!canvas) return;
            // 벽 충돌 감지
            if (x - radius <= 0 || x + radius >= canvas.width) {
                // 먼저 방향을 바꾸는 이유는 기본적인 물리 반사 법칙(거울 반사)을 적용하기 위해서서
                vx = -vx; // 진행 방향의 반대 방향으로 속도 변경 후 
                applyRandomBounce(); // 랜덤한 방향으로 튕기기
            }
            if (y - radius <= 0 || y + radius >= canvas.height) {
                vy = -vy;
                applyRandomBounce();
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화

            hue = (hue + 1) % 360;

            // 원 그리기
            ctx.beginPath(); // 새로운 경로 생성
            ctx.arc(x, y, radius, 0, Math.PI * 2, false); // 원 그리기
            const fillColor = mouseOverRef.current ? "green" : `hsl(${hue}, 100%, 50%)`;
            ctx.fillStyle = fillColor; // 원의 색
            ctx.fill();
            ctx.closePath();

            // 사각형 그리기
            ctx.beginPath();
            ctx.rect(50, 50, 100, 100);
            // ctx.stroke(); // 테두리만 그리기
            ctx.fillStyle = "blue"; // 사각형의 색상 설정
            ctx.fill(); // 사각형 채우기
            ctx.closePath();

            updateBall(); // 공 업데이트

            animationFrameId = requestAnimationFrame(animate); // 다음 프레임 애니메이션 요청
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

            if (mouseOverRef.current !== isOver) { // 마우스가 원 위에 있는지 여부가 변경되면

                mouseOverRef.current = isOver; // 마우스가 원 위에 있는지 여부 업데이트
                if (isOver) { // 마우스가 원 위에 있을 때
                    hoverStartRef.current = Date.now();
                    intervalRef.current = setInterval(() => {
                        // 마우스가 원 위에 있을 때마다 경과 시간 계산
                        if (hoverStartRef.current !== null) {
                            const elapsedTime = (Date.now() - hoverStartRef.current) / 1000;
                            setHoverTime(elapsedTime);
                        }
                    }, 100);
                } else {
                    if (hoverStartRef.current !== null) {
                        clearInterval(intervalRef.current!);
                        console.log(`마우스가 ${hoverTime.toFixed(2)}초 동안 원 위에 있었습니다.`);
                        hoverStartRef.current = null; // 초기화
                    }
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId); // 애니메이션 프레임 요청 취소
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [speed]); // 🚀 useEffect가 처음 한 번만 실행되도록 설정
    return (
        <section className=" w-full h-full relative bg-zinc-700 ">
            <canvas ref={canvasRef} className=" w-full h-full " />
            <h1 className="absolute top-10 left-10 text-black text-4xl ">Next.js Canvas 애니메이션</h1>
            <div className="absolute top-5 left-5 text-white text-lg bg-black px-4 py-2 rounded-lg">
                마우스 유지 시간: {hoverTime.toFixed(2)}초setSpeed
            </div>
            <div className="absolute top-5 right-5 text-white text-lg bg-black px-4 py-2 rounded-lg space-x-2">
                <button className="hover:text-blue-400" onClick={() => setSpeed(pre => pre - 1)}>-</button>
                <span>{speed}</span>
                <button className="hover:text-blue-400" onClick={() => setSpeed(pre => pre + 1)}>+</button>
            </div>
        </section>
    )
};

export default CanvasAnimation;
