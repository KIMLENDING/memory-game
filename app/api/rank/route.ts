import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

const RANK_KEY = "game_ranking"; // Redis 키 설정

// 🚀 랭킹 추가 API (POST 요청)
export async function POST(req: NextRequest) {
    try {
        const { name, level, score } = await req.json();
        if (!name || score === undefined) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

        // Redis에 점수 저장 (ZADD 사용)
        await redis.zadd(RANK_KEY, score, JSON.stringify({ name, level, score }));

        // 최대 50개까지 저장, 초과 시 점수순으로 다시 저장
        const rankCount = await redis.zcard(RANK_KEY);
        if (rankCount > 50) {
            await redis.zremrangebyrank(RANK_KEY, 0, rankCount - 51);
        }

        return NextResponse.json({ message: "Rank added successfully!" });
    } catch {
        return NextResponse.json({ error: "Failed to add rank" }, { status: 500 });
    }
}

// 🚀 랭킹 가져오는 API (GET 요청)
export async function GET() {
    try {
        // 점수 높은 순으로 최대 10개 가져오기
        const ranks = await redis.zrevrange(RANK_KEY, 0, 50, "WITHSCORES");

        // 데이터 변환
        const ranking = [];
        for (let i = 0; i < ranks.length; i += 2) {
            ranking.push({ ...JSON.parse(ranks[i]), score: Number(ranks[i + 1]) });
        }

        return NextResponse.json(ranking);
    } catch {
        return NextResponse.json({ error: "Failed to fetch rankings" }, { status: 500 });
    }
}
