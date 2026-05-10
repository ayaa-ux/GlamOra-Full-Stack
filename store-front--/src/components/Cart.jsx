import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ user }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {

            if (user && user.id) {
                try {

                    const response = await axios.get(`http://localhost:8080/api/cart/user/${user.id}`);
                    setCartItems(response.data);
                } catch (error) {
                    console.error("Error fetching cart:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchCart();
    }, [user]);

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    };

    if (loading) return <div className="p-10 text-center">Chargement de votre panier... ✨</div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Votre Panier 🛒</h2>

            {cartItems.length === 0 ? (
                <div className="bg-slate-50 p-10 rounded-[2rem] text-center text-slate-500">
                    {user ? "Le panier est vide, essayez d'ajouter des produits! 😊" : "Veuillez vous connecter pour voir votre panier."}
                </div>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100">
                            <div className="flex items-center gap-4">

                                <img src={item.product?.imageUrl || 'https://via.placeholder.com/150'} alt={item.product?.name} className="w-16 h-16 object-cover rounded-xl" />
                                <div>
                                    <h3 className="font-bold text-slate-800">{item.product?.name}</h3>
                                    <p className="text-sm text-slate-400">{item.product?.price} DH x {item.quantity}</p>
                                </div>
                            </div>
                            <span className="font-black text-indigo-600">{(item.product?.price || 0) * item.quantity} DH</span>
                        </div>
                    ))}

                    <div className="mt-10 pt-6 border-t-2 border-slate-100 flex justify-between items-center">
                        <span className="text-xl font-bold text-slate-800">Total à payer:</span>
                        <span className="text-3xl font-black text-indigo-600">{calculateTotal()} DH</span>
                    </div>

                    <button className="w-full mt-6 bg-indigo-600 text-white p-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                        Confirmer la commande
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;