import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

                <div>
                    <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">Déscription</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                        Votre magasin préféré pour les produits de qualité. L'innovation et l'excellence réunis en un seul endroit.
                    </p>
                </div>


                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Liens</h4>
                    <ul className="space-y-3 text-sm text-slate-600 font-medium">
                        <li>
                            <Link to="/" className="hover:text-indigo-600 transition-colors">Accueil</Link>
                        </li>
                        <li>
                            <Link to="/cart" className="hover:text-indigo-600 transition-colors">Panier</Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-indigo-600 transition-colors">Se connecter</Link>
                        </li>
                    </ul>
                </div>


                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Contactez-nous</h4>
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600 flex items-center gap-3">
                            <span className="text-indigo-500">📧</span> support@shopora.com
                        </p>
                        <p className="text-sm text-slate-600 flex items-center gap-3">
                            <span className="text-indigo-500">📍</span> Casablanca, Maroc
                        </p>
                        <div className="flex gap-6 mt-8 items-center">

                            <a href="https://facebook.com" target="_blank" rel="noreferrer"
                               className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white shadow-sm text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                                <FaFacebookF size={20} />
                            </a>


                            <a href="https://instagram.com" target="_blank" rel="noreferrer"
                               className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white shadow-sm text-[#E4405F] hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                                <FaInstagram size={22} />
                            </a>


                            <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer"
                               className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white shadow-sm text-[#25D366] hover:bg-[#25D366] hover:text-white hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                                <FaWhatsapp size={22} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-50 text-center">
                <p className="text-xs text-slate-400 font-medium">
                    &copy; {new Date().getFullYear()} Glamora. Fait par Aya et Asma.
                </p>
            </div>
        </footer>
    );
};

export default Footer;