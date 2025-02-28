import CanvasAnimation from '@/components/gsapComponents/canvas/CanvasAnimation'
import StarRail from '@/components/gsapComponents/canvas/StarRail'
import FloatingCircles from '@/components/gsapComponents/MotionPahtPlugin/FloatingCircles'
import MakeStar from '@/components/gsapComponents/scrollTrigger/MakeStar'
import React from 'react'

const page = () => {
    return (
        <>
            <MakeStar />
            <FloatingCircles />
            <CanvasAnimation />
            <StarRail />
        </>
    )
}

export default page