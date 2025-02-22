import React, { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap";
import { useGameStore } from '@/store/gameStore';

const Game = () => {
    const { level, numbers, correctSequence, isPlaying, generateNumbers, startGame, nextLevel, resetGame } = useGameStore();
    const [showNumbers, setShowNumbers] = useState(true); // 숫자가 보여지는 상태 (일정 시간 getTimeForLevel 후 숨김)
    const [clickedNumbers, setClickedNumbers] = useState<number[]>([]); // 클릭한 숫자(순서대로 기록) correctSequence와 비교 하여 정답 확인
    const [revealedCards, setRevealedCards] = useState<boolean[]>([]); // 카드가 보여지는 상태 (숫자를 맞추면 해당 카드는 공개)
    const [score, setScore] = useState(0); // 점수
    const [startTime, setStartTime] = useState<number | null>(null); // 숫자가 사라진 후 시간 기록 (반응 속도 계산 추가 점수용도)
    const [progress, setProgress] = useState(0); // 진행 바의 상태
    const cardRefs = useRef<(HTMLButtonElement | null)[]>([]); // 카드 요소의 참조를 저장

    // 게임 단계별로 보여주는 시간을 설정 (레벨에 따라)
    const getTimeForLevel = (level: number) => {
        if (level <= 5) {
            return 2 + level * 0.2; // 레벨 1~5: 2초 + 0.2초씩 증가
        } else {
            // 레벨 6부터는 1초씩 추가
            const bonusTime = Math.floor(level / 3) * 1;
            return 2 + bonusTime; // 기본 2초 + 보너스 시간
        }
    };

    useEffect(() => {
        if (isPlaying) {
            generateNumbers(); // 숫자 생성
            setShowNumbers(true); // 숫자 보여지는 상태
            setClickedNumbers([]); // 클릭한 숫자 초기화
            setRevealedCards(Array(numbers.length).fill(false)); // 초기 모든 카드를 가림

            const timeForCurrentLevel = (getTimeForLevel(level)); // 현재 레벨에 따른 시간

            setTimeout(() => {
                setShowNumbers(false);
                setStartTime(Date.now()); // 숫자가 사라지는 순간 시간 저장
            }, (timeForCurrentLevel + 0.2) * 1000); // 단계별 시간에 맞춰 숫자 숨김

            // 진행 바 업데이트
            let timeElapsed = 0;
            const interval = setInterval(() => {
                timeElapsed += 0.1;
                setProgress(Math.min((timeElapsed / timeForCurrentLevel) * 100, 100)); // 진행 바 업데이트

                if (timeElapsed >= timeForCurrentLevel) {
                    clearInterval(interval); // 시간 초과 시 진행 바 업데이트 중지
                }
            }, 100); // 0.1초마다 업데이트
        }
    }, [level, isPlaying]);

    useEffect(() => {
        if (numbers.length === 0) return;
        // 카드 색상 변화 애니메이션
        const timeForCurrentLevel = (getTimeForLevel(level));
        const stagger = timeForCurrentLevel / numbers.length; // 카드가 보여지는 시간 간격
        gsap.fromTo(
            cardRefs.current,
            { opacity: 0, },
            { opacity: 1, duration: 0.1, stagger: stagger, ease: "power2.out" }
        );
    }, [numbers]) // numbers가 업데이트 될 때마다 실행

    const handleClick = (num: number, index: number) => {
        if (showNumbers || revealedCards[index]) return; // 숫자가 보일 때 클릭 방지, 이미 클릭한 카드도 방지

        const newClicked = [...clickedNumbers, num]; // 클릭한 숫자 추가 (불변성 유지) 1부터 순차적으로 클릭한 숫자를 기록
        setClickedNumbers(newClicked); // 클릭한 숫자 업데이트

        const newRevealedCards = [...revealedCards]; // 카드 보여지는 상태 복사
        newRevealedCards[index] = true; // 클릭한 카드 공개
        setRevealedCards(newRevealedCards); // 카드 보여지는 상태 업데이트

        if (newClicked.every((val, idx) => val === correctSequence[idx])) { // 정답 확인
            if (newClicked.length === correctSequence.length) {
                const endTime = Date.now();
                if (startTime) {
                    const reactionTime = (endTime - startTime) / 1000; // 반응 속도 (초 단위)
                    const timeBonus = Math.max(0, 10 - reactionTime); // 남은 시간에 따른 추가 점수 (최대 10점)
                    setScore((prev) => prev + 10 + Math.round(timeBonus * 10) / 10); // 기본 10점 + 시간 보너스 (소수점 첫째 자리에서 반올림)
                }

                setTimeout(() => {
                    nextLevel();
                }, 500);
            }
        } else {
            setRevealedCards(Array(numbers.length).fill(true)); //  오답 시 모든 카드 공개

            setTimeout(() => {
                alert(`오답! 최종 점수: ${score.toFixed(1)}점\n다시 도전하세요!`);
                setScore(0); // 점수 초기화
                resetGame();
            }, 100);

        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8"
            style={{ backgroundColor: '#F4F8D3' }}>
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

            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 p-2 rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl">
                {numbers.map((num, index) => (
                    <button
                        key={num}
                        ref={(el) => { if (el) cardRefs.current[num] = el; }}
                        className={`aspect-square flex items-center justify-center rounded-lg 
                            text-xl sm:text-2xl md:text-3xl font-bold 
                            transition-transform  transform hover:scale-110 hover:shadow-lg `}
                        style={{
                            backgroundColor: showNumbers || revealedCards[index] ? '#F7CFD8' : '#73C7C7',
                            color: '#333',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => handleClick(num, index)}
                    >
                        {showNumbers || revealedCards[index] ? num : "?"}
                    </button>
                ))}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="p-3 sm:p-4 rounded-lg text-lg sm:text-xl font-semibold w-full sm:w-auto text-center"
                    style={{ backgroundColor: '#F7CFD8' }}>
                    <span style={{ color: '#333' }}>레벨: {level}</span>
                </div>
                <div className="p-3 sm:p-4 rounded-lg text-lg sm:text-xl font-semibold w-full sm:w-auto text-center"
                    style={{ backgroundColor: '#F7CFD8' }}>
                    <span style={{ color: '#333' }}>점수: {score.toFixed(1)}</span>
                </div>
            </div>

            {!isPlaying && (
                <button
                    className="mt-6 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold 
                             w-full sm:w-auto text-center transition-all hover:shadow-lg hover:scale-105"
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
    )
}

export default Game