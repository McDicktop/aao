import React, { useState, useEffect } from 'react';

const Burger = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { href: '#', label: 'Главная' },
        { href: '#', label: 'О нас' },
        { href: '#', label: 'Услуги' },
        { href: '#', label: 'Контакты' },
    ];

    return (
        <nav className="bg-white shadow-lg relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Логотип */}
                    <div className="flex-shrink-0">
                        <span className="text-xl font-bold text-gray-800">Logo</span>
                    </div>

                    {/* Десктопное меню */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Бургер кнопка */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-6 relative">
                                <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transform transition duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                                <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transform transition duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Мобильное меню - ИСПРАВЛЕННАЯ ЧАСТЬ */}
                <div className={`md:hidden absolute left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300 ease-in-out ${isMenuOpen
                    ? 'max-h-96 opacity-100 visible translate-y-0'
                    : 'max-h-0 opacity-0 invisible -translate-y-4'
                    }`}>
                    <div className="px-2 pt-2 pb-4 space-y-2 border-t">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Затемнение фона - ДОБАВЬТЕ z-index */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </nav>
    );
};

export default Burger;