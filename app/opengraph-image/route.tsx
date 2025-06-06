import { ImageResponse } from "@vercel/og";

export const config = {
    runtime: 'edge',
};

export async function GET() {
    try {
        // Get search params from URL
        // const params = await searchParams;
        // const score = typeof params.score === 'string' ? params.score : '';
        // For testing purposes, replace with actual score from searchParams

        return new ImageResponse(
            (
                <div
                    style={{
                        width: "1200px",
                        height: "630px",
                        display: "flex",
                        flexDirection: "column",
                        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                        position: "relative",
                        overflow: "hidden",
                        fontFamily: "Inter, sans-serif",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        padding: "40px",
                    }}
                >


                    {/* Title */}
                    <h1 style={{
                        fontSize: "64px",
                        fontWeight: "bold",
                        margin: "0 0 20px 0",
                        color: "#F8FAFC",
                        textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    }}>
                        순간 기억력 테스트 게임
                    </h1>

                    {/* Score display */}

                    <p style={{
                        fontSize: "32px",
                        fontWeight: "normal",
                        maxWidth: "800px",
                        textAlign: "center",
                        lineHeight: "1.5",
                        color: "#E2E8F0"
                    }}>
                        도전해보세요!
                    </p>


                    {/* Footer */}
                    <div style={{
                        position: "absolute",
                        bottom: "40px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        opacity: 0.8,
                    }}>
                        <div style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)"
                        }} />
                        <p style={{ fontSize: "24px", fontWeight: "medium", color: "#CBD5E1" }}>
                            memory-game.vercel.app
                        </p>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,

            }
        );
    } catch (e) {
        console.log(`Error generating image: ${e}`);
        return new Response(`Failed to generate image`, {
            status: 500,
        });
    }
}