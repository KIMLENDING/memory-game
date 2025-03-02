import React from 'react'

const layout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className='relative w-full min-h-screen h-full bg-cream text-pri '>
            <div className=' fixed top-0 left-0 w-full flex justify-between p-4 bg-opacity-80 bg-creamblue'>
                <h1 className=''>logo</h1>
                <div className='space-x-4 ' >
                    <a href='#hero' className='hover:underline' >소개</a>
                    <a href='#project' className='hover:underline'>프로젝트</a>
                    <a href='#skill' className='hover:underline'>기술</a>
                    <a href='#about' className='hover:underline'>연락</a>
                </div>
            </div>
            {children}
        </div>
    )
}

export default layout