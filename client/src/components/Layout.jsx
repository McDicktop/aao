import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function Layout() {
    return (
        <>
            <Navigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;