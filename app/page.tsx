import Game from "@/components/memory-game/Game";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {
  // searchParams를 await로 처리
  const params = await searchParams;

  const score = typeof params.score === 'string' ? params.score : '';
  const scoreText = score ? `${score}점을 달성했습니다! ` : "";

  const baseDescription = "이 게임은 숫자가 나타나고, 그 숫자를 순서대로 클릭하는 기억력 테스트 게임입니다. 점차 난이도가 상승합니다.";
  const description = scoreText ? `${scoreText}` : `${baseDescription}`;

  return {
    title: "순간 기억력 테스트 게임",
    description,
    openGraph: {
      title: "순간 기억력 테스트 게임",
      description,
      url: "https://memory-game-lyart-phi.vercel.app/",
      siteName: "순간 기억력 테스트 게임",
      images: [
        {
          url: "/image.png",
          width: 1200,
          height: 630,
          alt: "순간 기억력 테스트 게임 썸네일",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "순간 기억력 테스트 게임",
      description,
      images: "/image.png",
    },
  };
}
export default function Home() {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='fixed bottom-5 left-5 p-3 space-x-3'>

          <Link href={'/test'} className=' bg-blue-500 text-white p-3 rounded-full shadow-lg '>Test</Link>

        </div>
        <Game />
      </Suspense>
    </section>
  );
}