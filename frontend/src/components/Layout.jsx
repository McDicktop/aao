import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function Layout() {
    return (
        <>
            <Navigation />
            <main className='border border-red-500'>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;