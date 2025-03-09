"use client";

import { useEffect, useRef } from "react";
import Matter, { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body, Bounds } from "matter-js";

export default function MatterComponent() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // ✅ Matter.js 엔진 생성
        const engine = Engine.create();

        // ✅ 캔버스 렌더링 설정
        const render = Render.create({
            element: sceneRef.current!,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false,
                background: "#F7F4C8",
            },
        });

        // ✅ 박스 2개와 바닥 추가
        const boxA = Bodies.rectangle(400, 200, 80, 80);
        const boxB = Bodies.rectangle(450, 50, 80, 80);
        const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });

        // ✅ 벽 생성 (튕김 효과 추가)
        const wallOptions = { isStatic: true, restitution: 1 };
        const walls = [
            Bodies.rectangle(400, 0, 800, 50, wallOptions),
            Bodies.rectangle(400, 600, 800, 50, wallOptions),
            Bodies.rectangle(800, 300, 50, 600, wallOptions),
            Bodies.rectangle(0, 300, 50, 600, wallOptions),
        ];

        // ✅ 월드에 추가
        Composite.add(engine.world, [boxA, boxB, ground, ...walls]);

        // ✅ 마우스 추가
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse, // 마우스 이벤트
            constraint: {
                stiffness: 0.2, // 강성
                render: {
                    visible: false // 마우스 커서 안보이게
                }
            }
        });
        Composite.add(engine.world, mouseConstraint); // 마우스 이벤트 추가
        render.mouse = mouse;

        // ✅ 물체가 벽을 뚫고 나가는 경우 감지 후 위치 복구
        Events.on(engine, "beforeUpdate", () => {
            Composite.allBodies(engine.world).forEach((body) => {
                // 화면 바깥으로 나간 경우, 원래 위치로 강제 이동
                if (!Bounds.contains(render.bounds, body.position)) {
                    Body.setPosition(body, { x: 400, y: 100 }); // 강제로 다시 넣기
                }

                // 최대 속도 제한
                const maxVelocity = 10;
                if (Math.abs(body.velocity.x) > maxVelocity) {
                    Body.setVelocity(body, { x: Math.sign(body.velocity.x) * maxVelocity, y: body.velocity.y });
                }
                if (Math.abs(body.velocity.y) > maxVelocity) {
                    Body.setVelocity(body, { x: body.velocity.x, y: Math.sign(body.velocity.y) * maxVelocity });
                }
            });
        });

        // ✅ Matter.js 실행
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        return () => {
            Render.stop(render);
            Matter.World.clear(engine.world, false);
            Matter.Engine.clear(engine);
        };
    }, []);

    return <div ref={sceneRef} className="flex justify-center items-center h-screen bg-gray-900" />;
}
