import { useState, useRef } from 'react'
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

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // Задержка перед закрытием
    };

    const handleLanguage = (languageArg) => {
        dispatch(languageSelect(languageArg))
    }

    return (
        <div
            className="absolute left-30 flex items-center h-10 w-30"
            onMouseLeave={handleMouseLeave}
        >
            {console.log(app.language)}
            <img
                className='h-8 w-8 cursor-pointer'
                src={En}
                alt="en"
                onMouseEnter={handleMouseEnter}
                onClick={() => handleLanguage('en')}
            />

            <div
                onMouseEnter={handleMouseEnter}
                className={`flex space-x-2 transition-all duration-300 overflow-hidden ${isOpen ? 'w-28 opacity-100 ml-2' : 'w-0 opacity-0'}`}
            >
                <img
                    src={Es}
                    alt="Es"
                    className={`w-8 h-8 transition-all duration-300  cursor-pointer ${isOpen ? 'translate-x-0' : '-translate-x-6'}`}
                    onClick={() => handleLanguage('es')}
                />
                <img
                    src={Ru}
                    alt="Ru"
                    className={`w-8 h-8 transition-all duration-300  cursor-pointer ${isOpen ? 'translate-x-0' : '-translate-x-6'}`}
                    onClick={() => handleLanguage('ru')}
                />
            </div>
        </div>
    )
}

export default LanguageSelector