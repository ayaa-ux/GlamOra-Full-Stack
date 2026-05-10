 import React from 'react';
import ProductCard from './ProductCard';


const Home = ({ products, addToCart, user, searchTerm }) => {

    const handleOnAdd = (product) => {
        if (user) {
            addToCart(product);
        } else {
            alert("Vous devez vous connecter pour remplir votre panier! 😊");
        }
    };


    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-12">
            {/* Section Hero */}
            <div className="relative overflow-hidden flex flex-col items-center text-center py-24 px-6 rounded-[3rem] bg-slate-900 text-white mb-8 shadow-2xl shadow-slate-200">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <h1 className="relative text-6xl font-black mb-6 leading-tight tracking-tight">
                    L'Art du Shopping <br/>
                    <span className="text-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        GlamOra
                    </span>
                </h1>
                <p className="relative text-slate-300 max-w-2xl text-lg font-light leading-relaxed">
                    Découvrez notre collection GlamOra : Qualité, Design et Performance. ✨
                </p>
            </div>

            {/* Grid des Produits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-2">

                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={handleOnAdd}
                            user={user}
                        />
                    ))
                ) : (

                    <div className="col-span-full flex flex-col items-center py-32 text-slate-400">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🔍</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                            {searchTerm ? `Aucun résultat pour "${searchTerm}"` : "Chargement en cours..."}
                        </h3>
                        <p className="font-medium text-slate-400 italic">
                            {searchTerm ? "Essayez d'autres mots clés" : "Vérifiez votre connexion au serveur"}
                        </p>
                    </div>
                )}
            </div>

            {filteredProducts.length > 0 && (
                <div className="text-center py-10 opacity-30">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 italic">✨ Orora Luxury Collection ✨</p>
                </div>
            )}
        </div>
    );
};

export default Home;