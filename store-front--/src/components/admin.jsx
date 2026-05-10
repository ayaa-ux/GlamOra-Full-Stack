import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [view, setView] = useState('products');
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        quantity: ''
    });

    useEffect(() => {
        fetchProducts();
        fetchUsers();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/products');
            setProducts(res.data);
        } catch (error) {
            console.error("Erreur chargement produits", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/users/all');
            setUsers(res.data);
        } catch (error) {
            console.error("Erreur chargement users", error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                ...newProduct,
                price: parseFloat(newProduct.price),
                quantity: parseInt(newProduct.quantity) || 0
            };

            await axios.post('http://localhost:8080/api/products', productData);

            setNewProduct({ name: '', price: '', description: '', imageUrl: '', quantity: '' });
            fetchProducts();
            alert("Produit ajouté avec succès ! ✨");
        } catch (error) {
            console.error("Erreur ajout", error);
            alert("Erreur lors de l'ajout. Vérifiez si tous les champs sont corrects.");
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Êtes-vous sûre de vouloir supprimer ce produit ?")) {
            try {
                await axios.delete(`http://localhost:8080/api/products/${id}`);
                fetchProducts();
                alert("Produit supprimé !");
            } catch (error) {
                console.error("Erreur suppression produit", error);
            }
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Êtes-vous sûre de vouloir supprimer ce compte ?")) {
            try {
                await axios.delete(`http://localhost:8080/api/users/${id}`);
                fetchUsers();
                alert("Utilisateur supprimé !");
            } catch (error) {
                console.error("Erreur suppression user", error);
            }
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto bg-slate-50 min-h-screen">
            <h1 className="text-4xl font-black mb-10 text-slate-900 tracking-tight">Tableau de Bord 🛠️</h1>

            <div className="flex gap-4 mb-10 bg-white p-2 rounded-[2rem] shadow-sm w-fit border border-slate-100">
                <button
                    onClick={() => setView('products')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all ${view === 'products' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    📦 Produits
                </button>
                <button
                    onClick={() => setView('users')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all ${view === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    👥 Utilisateurs
                </button>
            </div>

            {view === 'products' ? (
                <>
                    <form onSubmit={handleAddProduct} className="bg-white p-8 rounded-[2.5rem] shadow-sm mb-12 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2"><h3 className="font-bold text-slate-800 mb-2 ml-2">Ajouter un nouveau produit</h3></div>
                        <input placeholder="Nom du produit" className="p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                        <input placeholder="Prix (DH)" type="number" step="0.01" className="p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                        <input placeholder="Lien de l'image (Direct link .jpg/.png)" className="p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
                        <input placeholder="Quantité" type="number" className="p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none" value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: e.target.value})} required />
                        <textarea placeholder="Description" className="p-4 bg-slate-50 border-none rounded-2xl md:col-span-2 focus:ring-2 focus:ring-indigo-100 outline-none h-32" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                        <button type="submit" className="md:col-span-2 bg-slate-900 text-white p-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100">Enregistrer le produit</button>
                    </form>

                    <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest font-bold">
                            <tr>
                                <th className="p-6">Produit</th>
                                <th className="p-6">Prix</th>
                                <th className="p-6">Stock</th>
                                <th className="p-6 text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody className="text-slate-600 font-medium">
                            {products.map(p => (
                                <tr key={p.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-all">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <img

                                                src={p.imageUrl || p.image_url || 'https://via.placeholder.com/150?text=No+Image'}
                                                alt={p.name}
                                                className="w-12 h-12 rounded-xl object-cover shadow-sm border border-slate-100"
                                                onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Error"; }}
                                            />
                                            <span className="text-slate-900 font-bold">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">{p.price} DH</td>
                                    <td className="p-6"><span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs">{p.quantity} en stock</span></td>
                                    <td className="p-6 text-center">
                                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-400 hover:text-red-600 font-bold transition-colors">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest font-bold">
                        <tr>
                            <th className="p-6">Nom d'utilisateur</th>
                            <th className="p-6">Adresse Email</th>
                            <th className="p-6 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody className="text-slate-600 font-medium">
                        {users.map(u => (
                            <tr key={u.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-all">
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black uppercase">{u.username ? u.username[0] : '?'}</div>
                                        <span className="text-slate-900 font-bold">{u.username}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-sm italic">{u.email}</td>
                                <td className="p-6 text-center">
                                    <button onClick={() => handleDeleteUser(u.id)} className="bg-red-50 text-red-500 px-5 py-2 rounded-xl text-xs font-black hover:bg-red-500 hover:text-white transition-all">
                                        SUPPRIMER LE COMPTE
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Admin;