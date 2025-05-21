import { create } from "zustand";

interface GameState {
    level: number;
    score: number;
    timeForCurrentLevel: number;
    numbers: number[];
    correctSequence: number[];
    isPlaying: boolean;
    setTimeForLevel: () => void;
    updateScore: (startTime: number) => void;
    generateNumbers: () => void;
    startGame: () => void;
    nextLevel: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>()((set) => ({
    level: 1,
    score: 0,
    timeForCurrentLevel: 0, // 현재 레벨의 제한시간
    numbers: [],
    correctSequence: [],
    isPlaying: false,

    generateNumbers: () => {
        set((state) => {
            const numCount = state.level + 3; // 1단계: 4개, 2단계: 5개 ...
            const orderedNumbers = Array.from({ length: numCount }, (_, i) => i + 1); // 1부터 순서대로 숫자 생성
            const shuffledNumbers = [...orderedNumbers].sort(() => Math.random() - 0.5); // 숫자 섞기
            return { numbers: shuffledNumbers, correctSequence: orderedNumbers };
        });
    },

    setTimeForLevel: () => {
        const calculateTime = (level: number) => {
            return 3 + level * 0.3; // 레벨당 0.3초씩 증가
        };
        set((state) => ({ timeForCurrentLevel: calculateTime(state.level) }));
    },

    startGame: () => {
        set({ isPlaying: true });
    },

    nextLevel: () => {
        set((state) => ({ level: state.level + 1 }));
    },

    resetGame: () => {
        set({ level: 1, numbers: [], correctSequence: [], score: 0, isPlaying: false, timeForCurrentLevel: 0 });
    },

    updateScore: (startTime: number) => {
        const calculateScore = (startTime: number, level: number) => {
            const endTime = Date.now();
            const reactionTime = (endTime - startTime) / 1000; // 반응 속도 (초 단위)
            const timeBonus = Math.max(0, 10 - reactionTime); // 10초 이내에 클릭 시 추가 점수
            const levelBonus = 10 * level; // 레벨당 추가 점수
            return timeBonus + levelBonus;
        };
        set((state) => ({ score: state.score + calculateScore(startTime, state.level) }));
    },
}));
