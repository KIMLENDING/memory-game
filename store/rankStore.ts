import { create } from "zustand";
import axios from "axios";
interface Rank {
    name: string;
    level: number;
    score: number;
    time: number;
}

interface RankState {
    ranking: Rank[]; // 랭킹 정보
    fetchRanking: () => Promise<void>; // 랭킹 불러오기
    addRank: (name: string, level: number, score: number) => Promise<void>; // 랭킹 추가
}

export const useRankStore = create<RankState>((set) => ({
    ranking: [],

    // 🚀 랭킹 불러오기
    fetchRanking: async () => {
        try {
            const res = await axios.get("/api/rank");
            set({ ranking: res.data });
        } catch (error) {
            console.error("Failed to fetch ranking:", error);
        }
    },

    // 🚀 점수 추가 (서버에 저장)
    addRank: async (name, level, score) => {
        try {
            const time = new Date().getTime(); // 현재 시간을 밀리초로 가져오기
            await axios.post("/api/rank", { name, level, score, time });
            set((state) => {
                const newRanking = [...state.ranking, { name, level, score, time }];
                newRanking.sort((a, b) => a.score === b.score ? a.time - b.time : b.score - a.score)
                return { ranking: newRanking };
            });
        } catch (error) {
            console.error("Failed to add rank:", error);
        }
    },
}));
