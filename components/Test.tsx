'use client'
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    username: string; // ✅ 저장할 상태
    score: number; // ❌ 저장하지 않을 상태
    age: number; // ❌ 저장하지 않을 상태
    setUsername: (name: string) => void;
    updateUser: (score: number, age: number) => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            username: "Guest",
            score: 0,
            age: 20,
            setUsername: (name) => set({ username: name }),
            updateUser: (score, age) => set({ score, age }),
        }),
        {
            name: "user-storage", // 로컬 스토리지 키
            // partialize: (state) => ({ username: state.username }), // 🔥 username만 저장
        }
    )
);

function Test() {
    const { username, score, age, setUsername, updateUser } = useUserStore();
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name);
        if (e.target.name === 'score') {
            if (e.target.value === '') {
                updateUser(0, age);
                return;
            }
            updateUser(parseInt(e.target.value), age);
        } else {
            if (e.target.value === '') {
                updateUser(score, 0);
                return;
            }
            updateUser(score, parseInt(e.target.value));
        }
    };
    return (
        <div>
            <h2>Username: {username}</h2>
            <input
                type="text"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
            />
            <h2>score: {score}</h2>
            <input
                type="text"
                value={score || 0}
                name="score"
                onChange={(e) => handleInput(e)}
            />
            <h2>age: {age}</h2>
            <input
                type="text"
                value={age || 0}
                name="age"
                onChange={(e) => handleInput(e)}
            />
        </div>
    );
}

export default Test;
