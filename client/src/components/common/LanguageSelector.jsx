import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import En from '../../assets/en.png'
import Es from '../../assets/es.png'
import Ru from '../../assets/ru.png'
import { languageSelect } from '../../features/appSlice';


function LanguageSelector() {

    const dispatch = useDispatch();
    const app = useSelector((state) => state.app);

    const [isOpen, setIsOpen] = useState(false);

    const timeoutRef = useRef(null);

    const language = [
        {
            id: 'en',
            alt: 'english language',
            ico: En,
            fn: () => {
                dispatch(languageSelect('en'))
                setIsOpen(false);
            }
        },
        {
            id: 'es',
            alt: 'spanish language',
            ico: Es,
            fn: () => {
                dispatch(languageSelect('es'))
                setIsOpen(false);
            }
        },
        {
            id: 'ru',
            alt: 'russian language',
            ico: Ru,
            fn: () => {
                dispatch(languageSelect('ru'))
                setIsOpen(false);
            }
        },
    ];

    const [appLanguage, setAppLanguage] = useState(null);

    useEffect(() => {
        setAppLanguage(language.find((el) => el.id === app.language));
    }, [app.language])

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    return (
        <>
            {appLanguage &&
                <div
                    className='flex items-center'
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        className='h-8 w-8 cursor-pointer'
                        src={appLanguage.ico}
                        alt={appLanguage.alt}
                        onMouseEnter={handleMouseEnter}
                        onClick={appLanguage.fn}
                    />

                    <div
                        onMouseEnter={handleMouseEnter}
                        className={`flex space-x-2 transition-all duration-300 overflow-hidden ${isOpen ? 'w-18 opacity-100 ml-2' : 'w-0 opacity-0'}`}
                    >
                        {language.filter((el) => el.id !== app.language).map((lang, ind) => (
                            <img
                                key={`ind_${ind}`}
                                src={lang.ico}
                                alt={lang.alt}
                                className={`w-8 h-8 transition-all duration-300  cursor-pointer ${isOpen ? 'translate-x-0' : '-translate-x-6'}`}
                                onClick={lang.fn}
                            />
                        ))}

                    </div>
                </div>
            }
        </>
    )
}

export default LanguageSelector