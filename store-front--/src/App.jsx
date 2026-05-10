import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Admin from './components/admin';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);


    const [searchTerm, setSearchTerm] = useState("");

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = async (product) => {

        if (!user || !user.id) {
            alert("Veuillez vous connecter ! 😊");
            return;
        }

        try {

            const response = await axios.post('http://localhost:8080/api/cart/add', {
                user: { id: Number(user.id) },
                product: { id: Number(product.id) },
                quantity: 1
            });

            if (response.status === 200 || response.status === 201) {

                setCart([...cart, product]);
                alert("Produit ajouté au panier ! 🛒✨");
            }
        } catch (error) {
            console.error("Error App.js addToCart:", error);

            alert("Erreur lors de l'ajout. Essayez de vous reconnecter.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">

            <Navbar
                user={user}
                setUser={setUser}
                cartCount={cart.length}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
                <Routes>

                    <Route
                        path="/"
                        element={
                            <Home
                                products={products}
                                addToCart={addToCart}
                                user={user}
                                searchTerm={searchTerm}
                            />
                        }
                    />

                    <Route path="/cart" element={<Cart user={user} />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin-secret-page" element={<Admin />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;