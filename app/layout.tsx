// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
// export const metadata: Metadata = {
//   title: "순간 기억력 테스트 게임",
//   description: "이 게임은 숫자가 나타나고, 그 숫자를 순서대로 클릭하는 기억력 테스트 게임입니다. 점차 난이도가 상승합니다.",
//   openGraph: {
//     title: "순간 기억력 테스트 게임",
//     description: "이 게임은 숫자가 나타나고, 그 숫자를 순서대로 클릭하는 기억력 테스트 게임입니다. 점차 난이도가 상승합니다.",
//     url: "https://memory-game-lyart-phi.vercel.app/", // 실제 게임 사이트 URL로 변경 필요
//     siteName: "순간 기억력 테스트 게임",
//     images: [
//       {
//         url: "/image.png", // 썸네일 이미지 URL로 변경 필요
//         width: 1200,
//         height: 630,
//         alt: "순간 기억력 테스트 게임 썸네일",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image", // 큰 썸네일 이미지를 사용하도록 설정
//     title: "순간 기억력 테스트 게임",
//     description: "이 게임은 숫자가 나타나고, 그 숫자를 순서대로 클릭하는 기억력 테스트 게임입니다. 점차 난이도가 상승합니다.",
//     images: "/image.png", // 썸네일 이미지 URL로 변경 필요
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="ko">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
