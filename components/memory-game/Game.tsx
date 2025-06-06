'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap";
import { useGameStore } from '@/store/gameStore';
import { DrawerDialogDemo } from './DrawerDialogDame';

import Link from 'next/link';

const Game = () => {
    const { level, numbers, correctSequence, isPlaying, score, timeForCurrentLevel, updateScore, generateNumbers, setTimeForLevel, startGame, nextLevel, resetGame } = useGameStore();
    const [showNumbers, setShowNumbers] = useState(false); // 숫자가 보여지는 상태 (일정 시간 getTimeForLevel 후 숨김)
    const [clickedNumbers, setClickedNumbers] = useState<number[]>([]); // 클릭한 숫자(순서대로 기록) correctSequence와 비교 하여 정답 확인
    const [revealedCards, setRevealedCards] = useState<boolean[]>([]); // 카드가 보여지는 상태 (숫자를 맞추면 해당 카드는 공개)
    const [startTime, setStartTime] = useState<number | null>(null); // 숫자가 사라진 후 시간 기록 (반응 속도 계산 추가 점수용도)
    const [progress, setProgress] = useState(0); // 진행 바의 상태
    const [gameOver, setGameOver] = useState(false); // 게임 종료 여부 상태

    const cardRefs = useRef<(HTMLButtonElement | null)[]>([]); // 카드 요소의 참조를 저장
    const firstBlockRef = useRef<HTMLDivElement | null>(null);
    const secondBlockRef = useRef<HTMLDivElement | null>(null);
    const thirdBlockRef = useRef<HTMLDivElement | null>(null);
    const gameOverRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (isPlaying) {
            generateNumbers(); // 숫자 생성
            setShowNumbers(true); // 숫자 보여지는 상태
            setClickedNumbers([]); // 클릭한 숫자 초기화
            setRevealedCards(Array(numbers.length).fill(false)); // 초기 모든 카드를 가림
            setTimeForLevel(); // 현재 레벨에 따른 시간
        }
    }, [level, isPlaying]);

    useEffect(() => {
        if (timeForCurrentLevel) {
            setShowNumbers(true); // 숫자 보여지는 상태 초기화
            setStartTime(null); // 시작 시간 초기화
            setProgress(0); // 진행 바 초기화
            setTimeout(() => {
                setShowNumbers(false);
                setStartTime(Date.now()); // 숫자가 사라지는 순간 시간 저장
            }, (timeForCurrentLevel + 1) * 1000); // 단계별 시간에 맞춰 숫자 숨김 모두 보인후 1초 후 숨김

            // 진행 바 업데이트
            let timeElapsed = 0;
            const interval = setInterval(() => {
                timeElapsed += 0.1;
                setProgress(Math.min((timeElapsed / (timeForCurrentLevel + 0.5)) * 100, 100)); // 진행 바 업데이트

                if (timeElapsed >= timeForCurrentLevel + 0.5) { // 시간 초과 시
                    clearInterval(interval); // 시간 초과 시 진행 바 업데이트 중지
                }
            }, 100); // 0.1초마다 업데이트
        }
    }, [timeForCurrentLevel, level, isPlaying]); // level과 isPlaying을 의존성 배열에 추가하여 매번 실행되도록 함

    useEffect(() => {
        if (numbers.length === 0) return;
        // 카드 색상 변화 애니메이션
        const stagger = timeForCurrentLevel / numbers.length; // 카드가 보여지는 시간 간격
        gsap.fromTo(
            cardRefs.current,
            { opacity: 0, },
            { opacity: 1, duration: 0.1, stagger: stagger, ease: "power2.out" }
        );
    }, [numbers]) // numbers가 업데이트 될 때마다 실행

    useEffect(() => {
        if (gameOver) {
            // 첫 번째 블록을 서서히 사라지게 하고, 그 후 두 번째, 세 번째 블록을 위로 이동
            if (firstBlockRef.current) {
                gsap.to(firstBlockRef.current, {
                    // opacity: 0,
                    duration: 1,
                    onStart: () => {
                        // 애니메이션 시작 시 버튼 클릭 막기
                        firstBlockRef.current?.classList.add('pointer-events-none');
                        secondBlockRef.current?.classList.add('pointer-events-none');
                        thirdBlockRef.current?.classList.add('pointer-events-none');
                    },
                    onComplete: () => {
                        // 애니메이션 완료 시 버튼 클릭 허용
                        firstBlockRef.current?.classList.remove('pointer-events-none');
                        secondBlockRef.current?.classList.remove('pointer-events-none');
                        thirdBlockRef.current?.classList.remove('pointer-events-none');
                    }
                    // onComplete: () => {
                    //     // 첫 번째 블록을 숨기고 두 번째, 세 번째 블록 이동
                    //     gsap.to(firstBlockRef.current, { height: 50 });
                    //     if (secondBlockRef.current && thirdBlockRef.current) {
                    //         gsap.to([thirdBlockRef.current, secondBlockRef.current], {
                    //             y: -50, // 위로 50px 이동
                    //             duration: 1,
                    //             onComplete: () => {
                    //                 // 애니메이션 완료 시 버튼 클릭 허용
                    //                 firstBlockRef.current?.classList.remove('pointer-events-none');
                    //                 secondBlockRef.current?.classList.remove('pointer-events-none');
                    //                 thirdBlockRef.current?.classList.remove('pointer-events-none');
                    //             }
                    //         });
                    //     }
                    // },
                });
            }
        } else {
            // 되돌리기
            if (firstBlockRef.current) {
                gsap.to(firstBlockRef.current, {
                    opacity: 1,
                    height: 'auto',
                });
            }
            if (secondBlockRef.current) {
                gsap.to([secondBlockRef.current], {
                    y: 0,
                });
            }
            if (thirdBlockRef.current) {
                gsap.to([thirdBlockRef.current], {
                    y: 0,
                });
            }
        }
    }, [gameOver]);

    const handleClick = (num: number, index: number) => {
        if (showNumbers || revealedCards[index]) return; // 숫자가 보일 때 클릭 방지, 이미 클릭한 카드도 방지

        const newClicked = [...clickedNumbers, num]; // 클릭한 숫자 추가 (불변성 유지) 1부터 순차적으로 클릭한 숫자를 기록
        setClickedNumbers(newClicked); // 클릭한 숫자 업데이트

        const newRevealedCards = [...revealedCards]; // 카드 보여지는 상태 복사
        newRevealedCards[index] = true; // 클릭한 카드 공개
        setRevealedCards(newRevealedCards); // 카드 보여지는 상태 업데이트

        if (newClicked.every((val, idx) => val === correctSequence[idx])) { // 정답 확인
            if (newClicked.length === correctSequence.length) { // 모든 숫자를 맞추었을 때
                if (startTime) {
                    updateScore(startTime); // 점수 업데이트
                }

                setTimeout(() => {
                    nextLevel();
                }, 500);
            }
        } else {
            setRevealedCards(Array(numbers.length).fill(true)); //  오답 시 모든 카드 공개
            setGameOver(true); // 게임 종료
        }
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8"
                style={{ backgroundColor: '#F4F8D3' }}>

                <Link href={'/rank'}
                    className='fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg'

                >
                    랭킹
                </Link>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center"
                    style={{ color: '#333' }}>
                    순간 기억력 테스트
                </h1>

                <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white/30 h-3 sm:h-4 rounded-lg mb-4">
                    <div
                        className="h-full rounded-lg"
                        style={{
                            width: `${progress}%`,
                            transition: "width 0.1s",
                            backgroundColor: '#73C7C7'
                        }}
                    ></div>
                </div>


                {/*카드 블럭 */}
                {isPlaying && (
                    <div
                        ref={firstBlockRef}
                        className={`grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 p-2 rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl bg-[#adaf98] 
                    ${gameOver ? 'pointer-events-none' : ''}`}>
                        {numbers.map((num, index) => (
                            <button
                                key={num}
                                ref={(el) => { if (el) cardRefs.current[num] = el; }}
                                className={`aspect-square flex items-center justify-center rounded-lg 
                                          text-xl sm:text-2xl md:text-3xl font-bold 
                                          transition-transform transform hover:scale-110 hover:shadow-lg
                                          ${gameOver && clickedNumbers.at(-1) === num ? 'shake' : ''}`}
                                style={{
                                    backgroundColor: gameOver && clickedNumbers.at(-1) === num ? '#FF5252' :
                                        showNumbers || revealedCards[index] ? '#F7CFD8' : '#73C7C7',
                                    color: '#333',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                                onClick={() => handleClick(num, index)}
                            >
                                {showNumbers || revealedCards[index] ? num : "?"}
                            </button>
                        ))}
                    </div>
                )}

                {/*게임 오버*/}
                {gameOver && (
                    <div
                        ref={gameOverRef}
                        className="flex flex-col items-center justify-center mt-4 p-4 rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl bg-[#adaf98]">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center"
                            style={{ color: '#333' }}>
                            게임 오버
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl  text-zinc-700 font-medium text-center">
                            누른 순서: {clickedNumbers.join(', ')}
                        </p>
                    </div>
                )}


                {/* 레벨 && 점수 */}
                <div className='grid grid-cols-1 gap-4 w-full max-w-md sm:max-w-lg md:max-w-2xl mt-4'>

                    <div
                        ref={thirdBlockRef}
                        className=" flex flex-row items-center gap-4 ">
                        <div className="flex-1 p-3 sm:p-4 rounded-lg text-lg sm:text-xl font-semibold w-full sm:w-auto text-center"
                            style={{ backgroundColor: '#F7CFD8' }}>
                            <span style={{ color: '#333' }}>레벨: {level}</span>
                        </div>
                        <div className=" flex-1 p-3 sm:p-4 rounded-lg text-lg sm:text-xl font-semibold w-full sm:w-auto text-center text-nowrap"
                            style={{ backgroundColor: '#F7CFD8' }}>
                            <span style={{ color: '#333' }}>점수: {score.toFixed(1)}</span>
                        </div>
                    </div>
                    {/* 다시하기 && 복사 */}
                    {gameOver && (
                        <div
                            ref={secondBlockRef}
                            className='flex flex-row items-center gap-4 '>
                            <button className=" px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-lg sm:text-xl font-bold 
                w-full  text-center transition-all hover:shadow-lg hover:scale-105"
                                style={{
                                    backgroundColor: '#73C7C7',
                                    color: '#333'
                                }} onClick={() => {
                                    setStartTime(null); // 시작 시간 초기화
                                    resetGame(); // 게임 초기화
                                    setGameOver(false); // 게임 종료 상태 초기화
                                }}>
                                다시하기
                            </button>
                            <DrawerDialogDemo score={score} level={level} />
                        </div>
                    )}
                </div>

                {/*게임 시작버튼 */}
                {!isPlaying && (
                    <button
                        className="mt-8 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold 
                max-w-2xl w-full text-center transition-all hover:shadow-lg hover:scale-105"
                        style={{
                            backgroundColor: '#73C7C7',
                            color: '#333'
                        }}
                        onClick={startGame}
                    >
                        게임 시작
                    </button>
                )}

            </div>
        </>
    )
}

export default Game