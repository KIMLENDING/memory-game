'use client';
import React, { useEffect, useRef } from 'react'

const StarRail = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current; // 캔버스 요소
        if (!canvas) return;

        const ctx = canvas.getContext("2d"); // 2D 렌더링 컨텍스트 생성
        if (!ctx) return;

        let animationFrameId: number; // 애니메이션 프레임 ID
        canvas.width = window.innerWidth; // 캔버스 너비
        canvas.height = window.innerHeight; // 캔버스 높이

        const train = new Image();
        train.src = "/train.webp"; // Next.js의 public 폴더에 넣어둔 이미지
        const ring = new Image();
        ring.src = "/circle.svg"; // Next.js의 public 폴더에 넣어둔 이미지

        const positions: { x: number, y: number }[] = []; // 위치 배열
        const getRandomPosition = () => {
            let x: number, y: number;
            do {
                x = Math.random() * (canvas.width - 250) + 125; // 캔버스 범위 내 랜덤 x 좌표
                y = Math.random() * (canvas.height - 250) + 125; // 캔버스 범위 내 랜덤 y 좌표
            } while (positions.some(pos => {
                const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
                return distance < 250; // 원이 겹치지 않도록 최소 거리 유지
            }));
            positions.push({ x, y });
            return { x, y };
        };
        for (let i = 0; i < 5; i++) {
            getRandomPosition();
        }
        let angle = 0; // 회전 각도 초기값

        const drawRotatedImage = (ring: HTMLImageElement, x: number, y: number) => {
            ctx.save(); // 현재 상태 저장
            ctx.translate(x, y); // 이미지 중심으로 이동
            ctx.rotate(angle); // 회전
            ctx.drawImage(ring, -125, -125, 250, 250); // (x, y, width, height)
            ctx.restore(); // 이전 상태 복원
        };

        const drawTrainImage = () => {
            ctx.drawImage(train, 200, 150, 250, 250); // (x, y, width, height)
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화

            drawTrainImage(); // 기차 이미지 그리기

            positions.forEach(({ x, y }) => {
                drawRotatedImage(ring, x, y); // 링 이미지 그리기
            });

            angle += 0.001; // 회전 각도 증가
            animationFrameId = requestAnimationFrame(animate); // 애니메이션 프레임 요청
        };

        train.onload = () => {
            ring.onload = () => {
                animate(); // 모든 링이 로드된 후 애니메이션 시작
            }
        }
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId); // 애니메이션 프레임 요청 취소
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className=' w-full h-full relative bg-zinc-500'>
            <canvas ref={canvasRef} className=" w-full h-full " />
        </div>
    )
}

export default StarRail