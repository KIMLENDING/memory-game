'use client'
import { useRankStore } from '@/store/rankStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Trophy, Home, Loader2 } from 'lucide-react';

const Rank = () => {
    const { ranking, fetchRanking } = useRankStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            await fetchRanking();
            setIsLoading(false);
        };
        loadData();
    }, [fetchRanking]);

    // 메달 색상 설정
    const getMedalColor = (index: number) => {
        switch (index) {
            case 0: return 'text-yellow-500'; // 금메달
            case 1: return 'text-gray-400';   // 은메달
            case 2: return 'text-amber-700';  // 동메달
            default: return 'text-gray-600';  // 그 외
        }
    };

    // 랭킹 배경색 설정
    const getRowBackground = (index: number) => {
        switch (index) {
            case 0: return 'bg-yellow-50';
            case 1: return 'bg-gray-50';
            case 2: return 'bg-amber-50';
            default: return index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-lg font-medium">랭킹 정보를 불러오는 중...</span>
            </div>
        );
    }

    if (!ranking || ranking.length === 0) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
                <div className="text-xl font-medium text-gray-600">랭킹 정보가 없습니다</div>
                <button
                    className="mt-6 flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md transition-colors hover:bg-blue-600"
                    onClick={() => router.push('/')}
                >
                    <Home className="mr-2 h-5 w-5" />
                    홈으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-screen flex-col bg-[#F4F8D3]">
            {/* 헤더 */}
            <div className="sticky top-0 z-10 flex items-center justify-center bg-white p-4 shadow-md">
                <Trophy className="mr-2 h-6 w-6 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-800">플레이어 랭킹</h1>
            </div>

            {/* 컬럼 헤더 */}
            <div className="sticky top-16 z-10 grid grid-cols-4 bg-gray-100 p-3 text-sm font-medium text-gray-600">
                <div className="text-center">순위</div>
                <div>플레이어</div>
                <div className="text-center">레벨</div>
                <div className="text-right pr-4">점수</div>
            </div>

            {/* 랭킹 목록 */}
            <div className="flex-1 overflow-y-auto pb-20">
                {ranking.map((rank, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-4 items-center border-b p-4 ${getRowBackground(index)}`}
                    >
                        <div className="flex justify-center">
                            <span className={`font-bold ${getMedalColor(index)}`}>
                                {index < 3 ? (
                                    <Trophy className={`h-5 w-5 ${getMedalColor(index)}`} />
                                ) : (
                                    `${index + 1}`
                                )}
                            </span>
                        </div>
                        <div className="font-medium text-gray-800 truncate">{rank.name}</div>
                        <div className="text-center font-medium text-blue-600">Lv.{rank.level}</div>
                        <div className="text-right font-bold pr-2">{rank.score.toLocaleString()}</div>
                    </div>
                ))}
            </div>

            {/* 홈 버튼 */}
            <button
                className="fixed bottom-6 right-6 flex items-center justify-center rounded-full bg-blue-500 p-3 text-white shadow-lg transition-transform hover:bg-blue-600 hover:scale-105"
                onClick={() => router.push('/')}
                aria-label="홈으로 이동"
            >
                <Home className="h-6 w-6" />
            </button>
        </div>
    );
};

export default Rank;