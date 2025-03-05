import React from 'react'

const page = () => {
    return (
        <div className='w-full min-h-screen bg-black'>
            <div className='relative w-screen h-fit border-2 border-yellow-400 bg-yellow-800 '>
                <div className=' w-full h-[50vh] border-2 border-red-400  bg-blue-400'>

                </div>
                <div className='absolute w-full h-32 overflow-hidden border-2 border-red-400'>
                    <div className='absolute w-full h-full left-0 top-0 bg-green-400'></div>
                </div>

            </div>
        </div>
    )
}

export default page