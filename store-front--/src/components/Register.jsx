import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            alert("Compte créé avec succès ! ✨");
            navigate('/login');
        } catch (error) {
            console.error("Registration Error:", error);
            alert(error.response?.data || "Erreur lors de l'inscription.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-10">
            <div className="w-full max-w-md p-12 bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-50 transition-all duration-500 hover:shadow-indigo-100/50">

                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Inscription</h2>
                    <p className="text-slate-400 font-medium">Bienvenue dans l'aventure ! ✨</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Nom d'utilisateur</label>
                        <input
                            type="text"
                            required
                            className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[1.5rem] transition-all outline-none text-slate-700 placeholder:text-slate-300"
                            placeholder="Votre nom"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[1.5rem] transition-all outline-none text-slate-700 placeholder:text-slate-300"
                            placeholder="ayouya@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Mot de passe</label>
                        <input
                            type="password"
                            required
                            className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[1.5rem] transition-all outline-none text-slate-700 placeholder:text-slate-300"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 rounded-[1.5rem] font-black text-white transition-all duration-300 shadow-xl active:scale-95 mt-4 ${
                            loading
                                ? 'bg-slate-200 cursor-not-allowed'
                                : 'bg-slate-900 hover:bg-indigo-600 shadow-indigo-100 hover:shadow-indigo-200'
                        }`}
                    >
                        {loading ? 'Création...' : "S'inscrire maintenant"}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-sm text-slate-400">
                        Vous avez déjà un compte ?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-indigo-600 font-bold hover:underline underline-offset-4"
                        >
                            Se connecter
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;