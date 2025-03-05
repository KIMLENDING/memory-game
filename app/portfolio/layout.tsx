"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react"; // 햄버거 메뉴 & 닫기 아이콘
import { CustomEase } from "gsap/all";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const sections = ["hero", "project", "skill", "about"];
    const sectionsKr = ["소개", "프로젝트", "기술", "연락"];
    const [activeSection, setActiveSection] = useState("hero");
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pathname !== "/portfolio") return;

        gsap.registerPlugin(ScrollTrigger);

        sections.forEach((section) => {

            ScrollTrigger.create({
                trigger: `#${section}`,
                start: "top 48%",
                end: "bottom 48%",
                onEnter: () => setActiveSection(section),
                onEnterBack: () => setActiveSection(section),
                markers: true,
            });
        });

        return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // 컴포넌트 언마운트 시 ScrollTrigger 제거
    }, [pathname]);

    useEffect(() => { // 네비게이션 하이라이트 애니메이션
        if (!navRef.current || !highlightRef.current) return;

        const navLinks = navRef.current.querySelectorAll("a");
        const activeIndex = sections.indexOf(activeSection);
        if (activeIndex === -1) return;

        const targetLink = navLinks[activeIndex];
        if (!targetLink) return;

        gsap.to(highlightRef.current, {
            x: targetLink.offsetLeft,
            width: targetLink.offsetWidth,
            duration: 0.5,
            ease: "expo.out",
        });
    }, [activeSection]);




    // 메뉴 열고 닫기 애니메이션
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (menuOpen) {
            gsap.to(mobileMenuRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                x: "100%",
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            });
        }
    }, [menuOpen]);

    return (
        <div className="relative w-full min-h-screen h-full ">
            {/* 상단 그라디언트 효과 blur-[5vh] lg:blur-[10vh]*/}

            {/* <div>
                <div className="absolute w-full h-[25vh] lg:h-[50vh] xl:h-[80vh]  left-1/2 -translate-x-1/2 bg-gradient-to-b blur-[5vh] lg:blur-[10vh] from-[#FFF8A9] to-[#FFF8A9] rounded-b-full">
                </div>
                <div className="absolute w-full h-[25vh] lg:h-[50vh] xl:h-[80vh]  left-1/2 -translate-x-1/2 rounded-b-full">
                    <div className="absolute w-[77%] h-[77%]  left-1/2 -translate-x-1/2 bg-gradient-to-b blur-3xl  from-[#FDF074] to-[#FFF8A9] rounded-b-full" />
                </div>
                <div className="absolute w-full h-[25vh] lg:h-[50vh] xl:h-[80vh]  left-1/2 -translate-x-1/2 rounded-b-full">
                    <div className="absolute w-[77%] h-[77%]  left-1/2 -translate-x-1/2  rounded-b-full" >
                        <div className="absolute w-[77%] h-[77%]  left-1/2 -translate-x-1/2 bg-gradient-to-b blur-2xl  from-yellow-400 to-[#FDF074]  rounded-b-full" />
                    </div>
                </div>
            </div> */}



            {/* 데스크탑 네비게이션 */}
            <nav className="fixed top-5 left-0 w-full text-softGray font-bold z-20 sm:flex sm:justify-center sm:items-center sm:gap-5 text-nowrap hidden ">
                <div
                    ref={navRef}
                    className="relative flex justify-between items-center gap-2 px-4 py-1 mx-4 bg-black rounded-full sm:w-fit"
                >
                    <Image alt="star" src="/circle.svg" height={30} width={30} />
                    <div
                        ref={highlightRef}
                        className="absolute top-0 left-0 bg-yellow-300/40 rounded-full h-10 transition-all"
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                    />
                    {sections.map((section, index) => (
                        <a
                            key={section}
                            href={`#${section}`}
                            className={`relative transition-colors duration-300 text-xl px-4 py-2 rounded-full ${pathname === "/portfolio" && activeSection === section
                                ? "text-yellow-300"
                                : "hover:text-white"
                                }`}
                        >
                            {sectionsKr[index]}
                        </a>
                    ))}
                </div>
            </nav>

            {/* 🌟 모바일 햄버거 메뉴 버튼 */}
            <button
                className="fixed top-5 right-5 z-30 sm:hidden p-2 bg-black rounded-full"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
            </button>

            {/* 🌟 모바일 메뉴 */}
            <div
                ref={mobileMenuRef}
                className=" fixed top-0 right-0 h-screen w-3/4 bg-black text-softGray z-20 flex flex-col justify-center items-center gap-6 sm:hidden"
                style={{ transform: "translateX(100%)", opacity: 0 }}
            >
                <div className="relative flex flex-col items-center gap-4">

                    {sections.map((section, index) => (
                        <a
                            key={section}
                            href={`#${section}`}
                            className={`text-xl font-bold transition-colors duration-300  rounded-full px-4 "${pathname === "/portfolio" && activeSection === section
                                ? " bg-yellow-300/40 text-yellow-300"
                                : " hover:text-white"
                                }`}
                            onClick={() => setMenuOpen(false)} // 클릭 시 메뉴 닫기
                        >
                            {sectionsKr[index]}
                        </a>
                    ))}
                </div>
            </div>

            {children}
        </div>
    );
};

export default Layout;
