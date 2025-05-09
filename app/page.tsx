import Game from "@/components/memory-game/Game";
import type { Metadata } from "next";

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
    keywords: [
      "기억력 테스트",
      "게임",
      "순간 기억력",
      "메모리 게임",
      "기억력 훈련",
      "두뇌 훈련",
    ],
    metadataBase: new URL(`${process.env.NEXTAUTH_URL}`),
    openGraph: {
      title: "순간 기억력 테스트 게임",
      description,
      url: new URL(`${process.env.NEXTAUTH_URL}`),
      siteName: "순간 기억력 테스트 게임",
      images: [
        {
          url: "/opengraph-image",
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
      images: ["/opengraph-image"],
    },
  };
}
export default function Home() {
  return (
    <section>
      <Game />
    </section>
  );
}