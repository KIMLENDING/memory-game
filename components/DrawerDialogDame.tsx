


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
import { useState } from "react"


export function DrawerDialogDemo({ score }: { score: number }) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

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
                    <Button variant="outline">공유하기</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>공유하기</DialogTitle>
                        <DialogDescription>
                            링크 복사 버튼을 클릭하면 클립보드에 복사됩니다.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
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
                <Button variant="outline">공유하기</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>공유하기</DrawerTitle>
                    <DrawerDescription>
                        링크 복사 버튼을 클릭하면 클립보드에 복사됩니다.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="default" onClick={copyLinkToClipboard}>복사</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}