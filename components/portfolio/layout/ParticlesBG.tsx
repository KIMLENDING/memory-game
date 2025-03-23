import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    // MoveDirection,
    // OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesBG = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            autoPlay: true,
            background: {
                color: {
                    value: "transparent", // 배경 투명
                },
                opacity: 1,
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse", // 마우스 오버 시 반응
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                bounce: {
                    horizontal: {
                        value: 1,
                    },
                    vertical: {
                        value: 1,
                    },
                },
                collisions: {
                    absorb: { speed: 2 },
                    bounce: {
                        horizontal: { value: 1 },
                        vertical: { value: 1 },
                    },
                    enable: true,
                    mode: "bounce", // 충돌 시 튕기기
                    maxSpeed: 50,
                    overlap: { enable: true, retries: 0 },
                },
                color: {
                    value: "#FFccFF", // 파티클 색상
                    // animation: {
                    //     h: { count: 4, speed: 5, sync: true, enable: true }, // 색상 변화
                    //     s: { count: 4, speed: 5, sync: true, enable: true }, // 채도
                    //     l: { count: 4, speed: 5, sync: true, enable: true }, // 밝기
                    // },
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "out", // 화면 밖으로 나가면 사라짐
                    },
                    random: false,
                    speed: 2,
                    straight: true,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 200, // 파티클 수
                    limit: {
                        mode: "delete",
                        value: 300,
                    },
                },
                opacity: {
                    value: 0.5, // 파티클 투명도
                },
                shape: {
                    type: "circle", // 원형 파티클
                },
                shadow: {
                    blur: 30, // 그림자 블러 효과
                    color: {
                        value: "#FF98FF", // 그림자 색상
                    },
                    enable: true,
                    offset: {
                        x: 1,
                        y: 1,
                    },
                },
                twinkle: {
                    lines: {
                        enable: true,
                        frequency: 0.01,
                        opacity: 1,
                    },
                    particles: {
                        enable: true,
                        frequency: 0.01,
                        opacity: 1,
                    },
                },
                size: {
                    value: { min: 1, max: 2 }, // 파티클 크기 범위
                },
            },
            pauseOnBlur: true,
            detectRetina: true,
        }
        ),
        [],
    );

    if (init) {
        return (
            <div className="fixed top-0 w-full min-h-screen -z-0 ">
                <div className="absolute top-0 w-full h-full transition-all bg-black" />
                <Particles
                    id="tsparticles"
                    className=" absolute inset-0"
                    particlesLoaded={particlesLoaded}
                    options={options}
                />
                <div className="absolute -bottom-1/2 left-0 translate-y-1/4 w-full h-[100vh] bg-[#77f8a9] bg-opacity-50 rounded-full blur-[20vh]" />
            </div>
        );
    }

    return <></>;
};

export default ParticlesBG;