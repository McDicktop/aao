import Logo from '../assets/aao.png'
import LanguageSelector from './common/LanguageSelector'

function Navigation() {


    return (
        <div className='sticky top-0 w-full h-20 bg-white flex items-center justify-center relative min-w-220 z-100'>
            <img className='absolute left-10' src={Logo} alt="logo" />

            <LanguageSelector />

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