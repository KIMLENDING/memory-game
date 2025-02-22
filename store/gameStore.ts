import { create } from "zustand";

interface GameState {
    level: number;
    numbers: number[];
    correctSequence: number[];
    isPlaying: boolean;
    generateNumbers: () => void;
    startGame: () => void;
    nextLevel: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    level: 1,
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

    startGame: () => {
        set({ isPlaying: true });
    },

    nextLevel: () => {
        set((state) => ({ level: state.level + 1 }));
    },

    resetGame: () => {
        set({ level: 1, numbers: [], correctSequence: [], isPlaying: false });
    },
}));
