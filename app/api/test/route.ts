import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
    await redis.set("test_key", "Hello, Redis!"); // 값 저장
    const value = await redis.get("test_key"); // 값 가져오기

    return NextResponse.json({ message: value });
}
