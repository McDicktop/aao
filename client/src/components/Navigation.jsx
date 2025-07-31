import Logo from '../assets/aao.png'
import LanguageSelector from './common/LanguageSelector'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toggleFullsize } from '../features/gallerySlice';

function Navigation() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const app = useSelector((state) => state.app);

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
        {
            item: 'contacts',
            en: 'Contacts',
            es: 'Contactos',
            ru: 'Контакты',
            fn: () => {
                dispatch(toggleFullsize(false));
                navigate('/contacts')
            }
        },
    ]


    return (
        <div className='sticky top-0 w-full h-20 bg-white flex items-center justify-center relative min-w-220 z-100'>
            <img className='absolute left-10' src={Logo} alt="logo" />

            <div className="absolute left-30">
                <LanguageSelector />
            </div>

            <nav className='flex text-xl list-none gap-10 w-fit'>
                {navItems.map((item, ind) => (
                    <li
                        key={`ind_${ind}`}
                        className="cursor-pointer w-32 text-center font-semibold hover:bg-neutral-800 hover:text-neutral-100 py-2 rounded-xl duration-300"
                        onClick={item.fn}
                    >{item[app.language]}</li>
                ))}
            </nav>

        </div>
    )
}

export default Navigation