import { create } from "zustand";
import axios from "axios";
interface Rank {
    name: string;
    level: number;
    score: number;
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
            await axios.post("/api/rank", { name, level, score });
            set((state) => {
                const newRanking = [...state.ranking, { name, level, score }];
                newRanking.sort((a, b) => b.score - a.score); // 점수 내림차순 정렬
                return { ranking: newRanking };
            });
        } catch (error) {
            console.error("Failed to add rank:", error);
        }
    },
}));
