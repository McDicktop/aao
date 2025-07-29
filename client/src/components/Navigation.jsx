import React from 'react'
import Logo from '../assets/aao.png'
import Ru from '../assets/ru.png'
import En from '../assets/en.png'
import Es from '../assets/es.png'

function Navigation() {
    return (
        <div className='sticky top-0 w-full h-20 bg-white flex items-center justify-center relative min-w-220 z-100'>
            <img className='absolute left-10' src={Logo} alt="logo" />
            <img className='absolute left-30 h-8 w-8' src={En} alt="en" />
            <div className='absolute left-38 border border-black flex'>
                <img className='h-8 w-8' src={Es} alt="en" />
                <img className='h-8 w-8' src={Ru} alt="en" />
            </div>
            <div></div>
            <nav className='flex text-xl list-none gap-10 w-fit'>
                <li className="cursor-pointer w-32 text-center font-semibold hover:bg-neutral-800 hover:text-neutral-100 py-2 rounded-xl duration-300">Home</li>
                <li className="cursor-pointer w-32 text-center font-semibold hover:bg-neutral-800 hover:text-neutral-100 py-2 rounded-xl duration-300">News</li>
                <li className="cursor-pointer w-32 text-center font-semibold hover:bg-neutral-800 hover:text-neutral-100 py-2 rounded-xl duration-300">About</li>
                <li className="cursor-pointer w-32 text-center font-semibold hover:bg-neutral-800 hover:text-neutral-100 py-2 rounded-xl duration-300">Contacts</li>
            </nav>

        </div>
    )
}

export default Navigation