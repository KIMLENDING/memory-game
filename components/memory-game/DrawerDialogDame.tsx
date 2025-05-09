


import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRankStore } from "@/store/rankStore"
import { useState } from "react"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/store/gameStore"


export function DrawerDialogDemo({ score, level }: { score: number, level: number }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [isComplited, setIsComplited] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { addRank } = useRankStore();
    const { resetGame } = useGameStore();
    const route = useRouter();

    // 랭킹에 추가하는 함수
    const addRanking = () => {
        addRank(name, level, +score.toFixed(1));
        alert('랭킹 등록 완료');
        setIsComplited(true);
    };
    // 점수에 포함된 URL을 복사하는 함수
    const copyLinkToClipboard = () => {
        const url = `https://memory-game-lyart-phi.vercel.app/?score=${score.toFixed(1)}`;
        navigator.clipboard.writeText(url).then(() => {
            alert('복사완료')
        }).catch((err) => {
            console.error("링크 복사 실패:", err);
        });
    };

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className=" px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-lg sm:text-xl font-bold 
                w-full  text-center transition-all hover:shadow-lg hover:scale-105 "
                        style={{
                            backgroundColor: '#73C7C7',
                            color: '#333'
                        }}>
                        랭킹등록
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>랭킹등록</DialogTitle>
                        <DialogDescription></DialogDescription>
                        <div>
                            <div className="space-y-2">
                                <Input type="text" placeholder="이름" onChange={(e) => setName(e.target.value)} />
                                <div className="px-2 text-gray-600 text-sm">
                                    이름을 등록하면 랭킹에 등록됩니다.
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter>

                        {isComplited ?
                            <Button variant="default" onClick={() => { resetGame(); route.push('/rank') }} >랭킹 페이지 바로가기기</Button> :
                            <Button variant="default" onClick={addRanking} >랭킹등록</Button>}
                        <DialogClose asChild>
                            <Button variant="default" onClick={copyLinkToClipboard}>복사</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <button className=" px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-lg sm:text-xl font-bold 
                w-full  text-center transition-all hover:shadow-lg hover:scale-105 "
                    style={{
                        backgroundColor: '#73C7C7',
                        color: '#333'
                    }}>
                    랭킹등록
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>랭킹등록</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                    <div>
                        <div className="space-y-2">
                            <Input type="text" placeholder="이름" onChange={(e) => setName(e.target.value)} />
                            <div className="px-2 text-gray-600 text-sm">
                                이름을 등록하면 랭킹에 등록됩니다.
                            </div>
                        </div>
                    </div>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    {isComplited ? (
                        <Button variant="default" onClick={() => { resetGame(); route.push('/rank') }}>랭킹 페이지 바로가기</Button>
                    ) : (
                        <Button variant="default" onClick={addRanking}>랭킹등록</Button>
                    )}
                    <DrawerClose asChild>
                        <Button variant="default" onClick={copyLinkToClipboard}>복사</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}