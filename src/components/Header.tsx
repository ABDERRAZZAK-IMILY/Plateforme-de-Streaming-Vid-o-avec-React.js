import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
    const { isAuthenticated, logout, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100 shadow-md px-4 md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">Accueil</Link></li>
                        {isAuthenticated && <li><Link to="/watchlist">Ma Liste</Link></li>}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">Video Stream</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li><Link to="/">Accueil</Link></li>
                    {isAuthenticated && <li><Link to="/watchlist">Ma Liste</Link></li>}
                </ul>
            </div>

            <div className="navbar-end gap-4">
                <input type="checkbox" value="light" className="toggle theme-controller" />

                
                {isAuthenticated ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                <span>{currentUser?.username.charAt(0).toUpperCase()}</span>
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="px-4 py-2 font-bold">{currentUser?.username}</li>
                            <li><button onClick={handleLogout} className="text-error">Déconnexion</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm md:btn-md">Connexion</Link>
                )}
            </div>
        </div>
    );
};