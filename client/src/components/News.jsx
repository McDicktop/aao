import React from 'react'
import expo1 from '../assets/expo1.jpg'
import expo2 from '../assets/expo2.jpg'
import expo3 from '../assets/expo3.jpg'


function News() {
    return (
        <div className='flex flex-col gap-10 items-center h-[calc(100vh-5rem)] overflow-auto py-10'>
            <img
                className='w-200 rounded-2xl'
                src={expo3}
                alt=""
            />
            <img
                className='w-200 rounded-2xl'
                src={expo2}
                alt=""
            />
            <img
                className='w-200 rounded-2xl'
                src={expo1}
                alt=""
            />
        </div>
    )
}

export default News