import { create } from "zustand";

interface GameState {
    score: number;
    startGame: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    score: 0,
    startGame: () => set({ score: 0 }),
    resetGame: () => set({ score: 0 }),
}));

