import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAdd, user }) => {
    const navigate = useNavigate();

    const handleAddToCart = async (e) => {

        e.preventDefault();


        if (!user || !user.id) {
            alert("Vous devez vous connecter pour ajouter des produits au panier ! 😊");
            navigate('/login');
            return;
        }

        try {

            const response = await axios.post('http://localhost:8080/api/cart/add', {
                user: { id: Number(user.id) },
                product: { id: Number(product.id) },
                quantity: 1
            }, {

                withCredentials: true
            });


            if (response.status === 200 || response.status === 201) {
                if (onAdd) onAdd(product);
                alert("Le produit a été ajouté avec succès! 🛒✨");
            }
        } catch (error) {

            console.error("Error adding to cart:", error.response?.data);
            alert("Une erreur s'est produite. Vérifiez si le serveur est actif.");
        }
    };

    return (
        <div className="group bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-4">

            <div className="relative h-64 w-full bg-slate-50 rounded-[2rem] overflow-hidden mb-6">
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="group-hover:scale-110 transition-transform duration-1000 object-cover w-full h-full"
                />
            </div>


            <div className="px-2">
                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed h-10">
                    {product.description || "Un produit d'excellence sélectionné pour Orora."}
                </p>

                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-3xl">
                    <div>
                        <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-bold">Prix</span>
                        <span className="text-2xl font-black text-slate-900">
                            {product.price} <small className="text-sm font-medium text-indigo-500">DH</small>
                        </span>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-indigo-600 hover:rotate-90 transition-all duration-500 shadow-lg shadow-indigo-100"
                        title="Ajouter au panier"
                    >
                        <span className="text-2xl font-light">+</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ProductCard;