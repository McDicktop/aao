import { useState, useEffect, useRef } from 'react';
import Logo from '../assets/aao.png'
import LanguageSelector from './common/LanguageSelector'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toggleFullsize } from '../features/gallerySlice';

function Navigation() {

    const app = useSelector((state) => state.app);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef(null);
    const burgerButtonRef = useRef(null);

    const navItems = [
        {
            item: 'gallery',
            en: 'Gallery',
            es: 'Galeria',
            ru: 'Галерея',
            fn: () => {
                dispatch(toggleFullsize(false));
                navigate('/')
            }
        },
        {
            item: 'news',
            en: 'News',
            es: 'Noticias',
            ru: 'Новости',
            fn: () => {
                dispatch(toggleFullsize(false));
                navigate('/news')
            }
        },
        {
            item: 'about',
            en: 'About',
            es: 'Sobre',
            ru: 'Обо мне',
            fn: () => {
                dispatch(toggleFullsize(false));
                navigate('/about')
            }
        },
        // {
        //     item: 'contacts',
        //     en: 'Contacts',
        //     es: 'Contactos',
        //     ru: 'Контакты',
        //     fn: () => {
        //         dispatch(toggleFullsize(false));
        //         navigate('/contacts')
        //     }
        // },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Если меню открыто и клик был вне меню и не по кнопке бургера
            if (isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                burgerButtonRef.current &&
                !burgerButtonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (isMenuOpen && event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        // Добавляем обработчики только если меню открыто
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        // Убираем обработчики при размонтировании или изменении isMenuOpen
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isMenuOpen]);


    return (
        <div className='flex items-center justify-center sticky top-0 w-full h-20 bg-white z-100 user-select-none relative'>

            {/* ЛОГО */}
            <img className='absolute left-2' src={Logo} alt="logo" draggable="false" />

            {/* ВЫБОР ЯЗЫКА */}
            <div className="absolute sm:left-20 left-20">
                <LanguageSelector />
            </div>

            {/* БУРГЕР КНОПКА */}
            <div
                ref={burgerButtonRef}
                className="md:hidden absolute right-10"
            >
                <button
                    onClick={() => { setIsMenuOpen((prev) => !prev) }}
                    className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200 cursor-pointer outline-none"
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-6 relative">
                        <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transform transition duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                        <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transform transition duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
                    </div>
                </button>
            </div>

            {/* ДЕСКТОП НАВИГАЦИЯ */}
            <nav className='hidden md:flex text-xl list-none gap-4 md:gap-10 w-fit'>
                {navItems.map((item, ind) => (
                    <li
                        key={`ind_${ind}`}
                        className="cursor-pointer w-22 lg:w-32 text-center font-semibold hover:bg-neutral-800 hover:text-neutral-100 py-2 rounded-xl duration-300"
                        onClick={item.fn}
                    >{item[app.language]}</li>
                ))}
            </nav>

            {/* МОБИЛЬНАЯ НАВИГАЦИЯ */}
            <div
                ref={menuRef}
                className={`px-20 rounded-2xl md:hidden absolute left-0 right-0 top-20 bg-white shadow-lg z-50 transition-all duration-300 ease-in-out ${isMenuOpen
                    ? 'max-h-96 opacity-100 visible translate-y-0'
                    : 'max-h-0 opacity-0 invisible -translate-y-4'
                    }`}
            >
                <nav className="list-none text-lg flex flex-col items-center gap-4 py-4">
                    {navItems.map((item, ind) => (
                        <li
                            key={`ind_${ind}`}
                            className="cursor-pointer w-full lg:w-32 text-center font-semibold hover:bg-neutral-800 hover:text-neutral-100 py-2 rounded-xl duration-300"
                            onClick={() => {
                                item.fn();
                                setIsMenuOpen(false)
                            }}
                        >{item[app.language]}</li>
                    ))}
                </nav>
            </div>

        </div>
    )
}

export default Navigation