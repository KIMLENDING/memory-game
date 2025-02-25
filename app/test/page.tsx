import CanvasAnimation from '@/components/CanvasAnimation'
import FloatingCircles from '@/components/gsapComponents/MotionPahtPlugin/FloatingCircles'
import MakeStar from '@/components/gsapComponents/scrollTrigger/MakeStar'
import React from 'react'

const page = () => {
    return (
        <>
            <MakeStar />
            <FloatingCircles />
            <CanvasAnimation />
        </>
    )
}

export default page