'use client'
import { useGameStore } from '@/store/gameStore';
import { useRankStore } from '@/store/rankStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Rank = () => {
    const { ranking, fetchRanking } = useRankStore();
    const route = useRouter();
    useEffect(() => {
        fetchRanking();
    }, [fetchRanking])
    console.log(ranking)
    if (ranking === undefined) return <div>랭킹이 없습니다.</div>
    return (
        <div className=' w-full h-screen flex flex-col' style={{ backgroundColor: '#F4F8D3', color: '#333' }}>
            <div className='text-lg sm:text-xl font-semibold text-center text-nowrap' style={{ backgroundColor: '#F7CFD8', color: '#333' }}>랭킹</div>
            <div className='flex-1 overflow-y-auto'>
                {ranking.map((rank, index) => (
                    <div key={index} className="bg-teal-200 my-2 p-2 rounded flex justify-between items-center gap-5 whitespace-nowrap">
                        <span>{index + 1}위</span>
                        <span className='max-w-[8rem] w-[8rem] min-w-[4rem] text-ellipsis overflow-hidden whitespace-nowrap'>{rank.name}</span>
                        <span>{rank.level}레벨</span>
                        <span className='max-w-16 min-w-16 text-center'>{rank.score}점</span>
                    </div>
                ))}
            </div>
            <button
                className='fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg'
                onClick={() => route.push('/')}
            >
                홈으로
            </button>
        </div>
    )
}

export default Rank