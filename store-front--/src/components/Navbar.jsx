

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser, cartCount, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100/60 px-6 py-4 transition-all">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-10">

                {/* Logo */}
                <Link to="/" className="group flex items-center gap-2 shrink-0">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:bg-indigo-600 transition-all duration-500 group-hover:rotate-12">
                        G
                    </div>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter hidden sm:block">
                        GlamOra
                    </span>
                </Link>


                <div className="flex-grow max-w-lg relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-slate-400 group-focus-within:text-indigo-500 transition-colors">🔍</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        className="w-full bg-slate-50 border-2 border-transparent py-2.5 pl-12 pr-4 rounded-2xl text-sm outline-none focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 transition-all text-slate-700 placeholder:text-slate-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>


                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative p-3 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-all group">
                        <span className="text-xl group-hover:scale-110 block transition-transform">🛒</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-lg border-2 border-white animate-bounce">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2 pl-2 border-l border-slate-100 ml-2">
                            <div className="hidden lg:flex flex-col items-end mr-2 text-right">
                                <span className="text-xs font-black text-slate-900 leading-none">
                                    {user.username || 'Utilisateur'}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-tighter transition-colors"
                                >
                                    Déconnexion
                                </button>
                            </div>
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100 border-2 border-white">
                                {user.username ? user.username[0].toUpperCase() : 'U'}
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95 whitespace-nowrap">
                            Connexion
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;