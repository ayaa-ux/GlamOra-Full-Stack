import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email: email,
                password: password
            });

            localStorage.setItem('user', JSON.stringify(response.data));
            if (setUser) setUser(response.data);

            alert("Bienvenue! ✨");
            navigate('/');
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data || "Email ou mot de passe incorrect!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md p-12 bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-50 transition-all duration-500 hover:shadow-indigo-100/50">

                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Connexion</h2>
                    <p className="text-slate-400 font-medium">Heureux de vous revoir ! ✨</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[1.5rem] transition-all outline-none text-slate-700 placeholder:text-slate-300"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[1.5rem] transition-all outline-none text-slate-700 placeholder:text-slate-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 rounded-[1.5rem] font-black text-white transition-all duration-300 shadow-xl active:scale-95 ${
                            loading
                                ? 'bg-slate-200 cursor-not-allowed'
                                : 'bg-slate-900 hover:bg-indigo-600 shadow-indigo-100 hover:shadow-indigo-200'
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Vérification...
                            </span>
                        ) : 'Se connecter'}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-sm text-slate-400">
                        Nouveau ici ? {' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="text-indigo-600 font-bold hover:underline underline-offset-4"
                        >
                            Créer un compte
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;