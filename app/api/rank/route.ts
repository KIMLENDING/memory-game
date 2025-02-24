import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

const RANK_KEY = "game_ranking"; // Redis 키 설정 

// 🚀 랭킹 추가 API (POST 요청)
export async function POST(req: NextRequest) {
    try {
        const { name, level, score, time } = await req.json();
        if (!name || score === undefined) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

        // Redis에 점수 저장 (ZADD 사용)
        /** sorted set (정렬된 집합)에 멤버를 추가합니다.
         * 첫 번째 요소: 정렬된 집합의 키 (key)
         * 두 번째 요소: 정렬 기준이 되는 점수 (score) number타입입
         * 세 번째 요소: 집합에 추가할 멤버 (member)
         * score가 같아도 멤버가 다르면 추가됨
         */
        await redis.zadd(RANK_KEY, score, JSON.stringify({ name, level, score, time }));

        // 최대 50개까지 저장, 초과 시 점수순으로 다시 저장
        const rankCount = await redis.zcard(RANK_KEY); // 정렬된 집합의 요소 수를 반환
        if (rankCount > 50) {
            await redis.zremrangebyrank(RANK_KEY, 0, rankCount - 51); // 정렬된 집합에서 순위에 따라 요소를 제거 50개 이상이면 50개 이하로 줄이기
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
        // const ranks = await redis.zrevrange(RANK_KEY, 0, 50, "WITHSCORES"); WITHSCORES는 score까지 같이 가져옴(score는 zadd의 두 번째 인자를 말하는거임 )
        const ranks = await redis.zrevrange(RANK_KEY, 0, 50,); // 이러면 member만 가져옴
        // 데이터 변환
        const ranking = [];
        for (let i = 0; i < ranks.length; i += 1) {
            ranking.push({ ...JSON.parse(ranks[i]) });
        }

        return NextResponse.json(ranking);
    } catch {
        return NextResponse.json({ error: "Failed to fetch rankings" }, { status: 500 });
    }
}
