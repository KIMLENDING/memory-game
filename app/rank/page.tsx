'use client'
import { useRankStore } from '@/store/rankStore';
import React, { useEffect } from 'react'

const Rank = () => {
    const { ranking, fetchRanking } = useRankStore();
    useEffect(() => {
        fetchRanking();
    }, [fetchRanking])
    console.log(ranking)
    if (ranking === undefined) return <div>랭킹이 없습니다.</div>
    return (
        <div className='text-black' style={{ backgroundColor: '#F4F8D3', padding: '20px', borderRadius: '10px' }}>
            {ranking.map((rank, index) => (
                <div key={index} className="bg-teal-200 my-2 p-2 rounded flex justify-between items-center">
                    <span  >{index + 1}위</span>
                    <span >{rank.name}</span>
                    <span >{rank.level}레벨</span>
                    <span >{rank.score}점</span>
                </div>
            ))}
        </div>
    )
}

export default Rank