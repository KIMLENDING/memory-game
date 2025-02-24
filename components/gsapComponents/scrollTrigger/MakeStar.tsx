'use client'
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const MakeStar = () => {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [numbers, setNumbers] = useState<{ id: number; x: number; y: number }[]>([]);

    const getRandomPosition = () => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        return { x, y };
    };

    useEffect(() => {
        const el = boxRef.current;
        if (!el || !containerRef.current) return;

        gsap.fromTo(el,
            { height: '20vh', width: '40vw' },
            {
                height: '100vh', width: '100vw',
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%', // 뷰포트 상단에서 80% 지점부터 시작
                    end: 'top 20%', // 뷰포트 상단에서 20% 지점까지 스크롤하면 끝남
                    scrub: true,
                    // markers: true
                }
            }
        );

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: '10% top', //  시작점 10% 지점부터 시작 (뷰포트 상단)
            end: '+=2000', // 2000px scroll 할 때까지
            scrub: true,
            onUpdate: (self) => {
                const progress = Math.floor(self.progress * 100);
                setNumbers(prev => {
                    const newNumbers = [...prev];
                    while (newNumbers.length < progress) {
                        newNumbers.push({ id: newNumbers.length + 1, ...getRandomPosition() });
                    }
                    while (newNumbers.length > progress) {
                        newNumbers.pop();
                    }
                    return newNumbers;
                });
            },
            // onLeave: () => { // 모든 애니메이션을 끝내고 초기화
            //     setNumbers([]);
            // },
            // markers: true // markers: true로 하면 스크롤 위치에 따라 트리거가 어떻게 동작하는지 시각적으로 확인 가능
        });
    }, []);

    return (
        <div ref={containerRef} className='w-full min-h-[300vh] flex flex-col items-center justify-start  overflow-y-scroll' style={{ backgroundColor: '#F4F8D3', color: '#333' }}>
            <div ref={boxRef} className='flex items-center justify-center text-white text-4xl fixed bottom-0' style={{ backgroundColor: '#000', height: '20vh', width: '40vw' }}>
                <div className='absolute text-center'>밤하늘</div>
                <div className=' flex min-h-screen pt-20 overflow-hidden'>
                    {numbers.map((num) => (
                        <div key={num.id} className='text-4xl font-bold absolute' style={{ left: num.x, top: num.y, color: '#333' }}>
                            <Image alt={'star'} src={'/star.svg'} height={50} width={50} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MakeStar;