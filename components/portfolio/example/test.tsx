"use client";

import { useEffect, useRef, useState } from "react";
import Matter, { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body, Bounds } from "matter-js";

export default function MatterComponent() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const [isLoad, isLoadSet] = useState(false);
    useEffect(() => {
        isLoadSet(true);
    }, []);
    useEffect(() => {
        if (!isLoad) return;
        if (!sceneRef.current) return;

        // ✅ Matter.js 엔진 생성
        const engine = Engine.create();

        // ✅ 캔버스 렌더링 설정
        const render = Render.create({
            element: sceneRef.current!,
            engine: engine,
            options: {
                width: 300,
                height: 300,
                wireframes: false, // 와이어프레임 미사용
                background: "transparent", // 배경색

            },
        });

        // ✅ 박스 2개와 바닥 추가
        const boxA = Bodies.rectangle(150, 200, 60, 60, { restitution: 0.5 }); //(x, y, width, height, options)
        const boxB = Bodies.rectangle(150, 50, 60, 60, { restitution: 0.9 });
        const cricle = Bodies.circle(150, 100, 30, { restitution: 1 }); // (x, y, radius, options)

        // ✅ 벽 생성 (튕김 효과 추가)
        const wallOptions = { isStatic: true, restitution: 1 }; // isStatic: true -> 움직이지 않음 , restitution: 1 -> 튕김 효과
        const walls = [
            Bodies.rectangle(150, 2.5, 300, 5, { ...wallOptions, }), // 상단 벽
            Bodies.rectangle(150, 297.5, 300, 5, { ...wallOptions, }), // 바닥
            Bodies.rectangle(297.5, 150, 5, 300, { ...wallOptions, }), // 오른쪽 벽
            Bodies.rectangle(2.5, 150, 5, 300, { ...wallOptions, }), // 왼쪽 벽
        ];

        // ✅ 월드에 추가
        Composite.add(engine.world, [boxA, boxB, cricle, ...walls]);

        // ✅ 마우스 추가
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse, // 마우스 이벤트
            constraint: {
                stiffness: 0.7, // 강성
                render: {
                    visible: false // 마우스 커서 안보이게
                }
            }
        });
        Composite.add(engine.world, mouseConstraint); // 마우스 이벤트 추가
        render.mouse = mouse;

        // mouseConstraint.mouse.element.addEventListener("mouseenter", (e) => {
        //     e.preventDefault();
        //     if (engine.world.bodies.length > 100) {
        //         Composite.remove(engine.world, engine.world.bodies[8]); // 100개 이상일 경우 첫번째 물체 제거
        //     }
        //     Composite.add(engine.world, Bodies.circle(150, 150, 5, { restitution: 1 })); // 마우스 클릭시 원 생성
        // });

        // ✅ 물체가 벽을 뚫고 나가는 경우 감지 후 위치 복구
        Events.on(engine, "beforeUpdate", () => {
            Composite.allBodies(engine.world).forEach((body) => {
                // 화면 바깥으로 나간 경우, 원래 위치로 강제 이동

                if (!Bounds.contains(render.bounds, body.position)) {
                    console.log("바깥으로 나감", body);
                    Body.setPosition(body, { x: 400, y: 100 }); // 강제로 다시 넣기
                }

                // 최대 속도 제한
                const maxVelocity = 8;
                if (Math.abs(body.velocity.x) > maxVelocity) {
                    Body.setVelocity(body, { x: Math.sign(body.velocity.x) * maxVelocity, y: body.velocity.y });// x축 속도 제한
                }
                if (Math.abs(body.velocity.y) > maxVelocity) {
                    Body.setVelocity(body, { x: body.velocity.x, y: Math.sign(body.velocity.y) * maxVelocity }); // y축 속도 제한
                }
            });
        });

        // ✅ Matter.js 실행
        Render.run(render); // 렌더러 실행
        const runner = Runner.create(); // 러너 생성
        Runner.run(runner, engine); // 러너 실행

        return () => {
            Render.stop(render);
            Matter.World.clear(engine.world, false);
            Matter.Engine.clear(engine);
        };
    }, [isLoad]);

    return <div ref={sceneRef} className=" h-fit w-fit  " />;
}
