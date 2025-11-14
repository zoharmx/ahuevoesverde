import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// Fix: Define interfaces for data structures to ensure type safety.
interface MenuItemData {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface CartItemData extends MenuItemData {
    quantity: number;
}

const menuData: { platillos: MenuItemData[], bebidas: MenuItemData[] } = {
    platillos: [
        { id: 1, name: "Ahuevo Homelet", description: "3 huevos, queso gouda y jamón. Con frijol, puré y postre.", price: 120, image: "https://i.imgur.com/k2QJ7b3.jpeg" },
        { id: 2, name: "Ahuevo Sonora", description: "3 huevos sobre 3 tortillas blandas, gratinados y bañados con salsa de la casa. Con frijol, puré y postre.", price: 135, image: "https://i.imgur.com/vH33b7U.jpeg" },
        { id: 3, name: "Ahuevo Mexicano", description: "3 huevos con tomate, cebolla y chile, acompañados con tiras de queso fresco. Con frijol, puré y postre.", price: 115, image: "https://i.imgur.com/WpPz0iV.jpeg" },
        { id: 4, name: "Ahuevo Veracruz", description: "3 huevos con tocino de alta calidad, acompañados con tiras de queso fresco. Con frijol, puré y postre.", price: 125, image: "https://i.imgur.com/k2QJ7b3.jpeg" },
        { id: 5, name: "Ahuevo Chilango", description: "3 huevos con chorizo de Toluca, acompañado con tiras de queso fresco. Con frijol, puré y postre.", price: 130, image: "https://i.imgur.com/WpPz0iV.jpeg" },
    ],
    bebidas: [
        { id: 6, name: "Jugo Verde", description: "Espinaca, nopal, apio, piña y perejil.", price: 60, image: "https://i.imgur.com/vV5g0ga.jpeg" },
        { id: 7, name: "Agua de Naranja", description: "Agua fresca natural de naranja.", price: 45, image: "https://i.imgur.com/Rkl4yEX.jpeg" },
        { id: 8, name: "Agua de Melón", description: "Agua fresca natural de melón.", price: 45, image: "https://i.imgur.com/Rkl4yEX.jpeg" },
        { id: 9, name: "Agua de Piña", description: "Agua fresca natural de piña.", price: 45, image: "https://i.imgur.com/Rkl4yEX.jpeg" },
        { id: 10, name: "Café de Olla", description: "Café de olla tradicional con leche caliente.", price: 50, image: "https://i.imgur.com/0i9xM4S.jpeg" },
    ]
};

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

const Header = ({ cartItemCount, onCartClick }: HeaderProps) => (
    <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
            <a href="#home" className="flex-shrink-0 flex items-center gap-3 group">
                <img src="https://i.imgur.com/eB4Y1b6.jpeg" alt="Logo A huevo es verde" className="h-16 w-auto rounded-full transition-transform duration-300 group-hover:scale-110" />
                <span className="font-display font-bold text-2xl text-brand-blue hidden sm:block">A huevo es verde</span>
            </a>
            <button onClick={onCartClick} className="relative btn bg-brand-yellow text-brand-dark font-bold py-2 px-4 rounded-full flex items-center gap-2">
                <i className="fas fa-shopping-cart"></i>
                <span className="hidden sm:inline">Mi Orden</span>
                {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-blue text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{cartItemCount}</span>
                )}
            </button>
        </div>
    </header>
);

const Hero = () => (
    <section id="home" className="relative pt-20 min-h-[60vh] md:min-h-screen flex items-center justify-center text-center bg-brand-light-blue overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aztec.png')" }}></div>
        <div className="relative z-10 p-4">
            <img src="https://i.imgur.com/eB4Y1b6.jpeg" alt="Logo" className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full shadow-2xl mb-6"/>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-brand-blue drop-shadow-lg mb-2">
                A huevo es verde
            </h1>
            <p className="text-xl md:text-2xl text-brand-dark font-semibold mb-8">Almuerzos y Jugos Frescos, ¡Directo a la Aduana!</p>
            <a href="#menu" className="btn bg-brand-yellow hover:bg-yellow-400 text-brand-dark font-bold text-lg py-3 px-8 rounded-full inline-block">
                <i className="fas fa-utensils mr-2"></i>
                Ver Menú y Ordenar
            </a>
        </div>
    </section>
);

interface MenuItemProps {
    item: MenuItemData;
    onAddToCart: (item: MenuItemData) => void;
}

const MenuItem = ({ item, onAddToCart }: MenuItemProps) => (
    <div className="menu-card bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
        <div className="p-6 flex-grow flex flex-col">
            <h3 className="font-display text-2xl text-brand-blue mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description}</p>
            <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-2xl text-brand-dark">${item.price.toFixed(2)}</span>
                <button onClick={() => onAddToCart(item)} className="btn bg-brand-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-sm">
                    <i className="fas fa-plus mr-2"></i>
                    Agregar
                </button>
            </div>
        </div>
    </div>
);

interface MenuProps {
    onAddToCart: (item: MenuItemData) => void;
}

const Menu = ({ onAddToCart }: MenuProps) => (
    <section id="menu" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-display font-bold text-5xl md:text-6xl text-brand-blue mb-4">Nuestro Menú</h2>
                <p className="text-lg text-gray-600">Todos nuestros platillos incluyen frijol negro refrito, puré, postre y tortillas hechas a mano.</p>
            </div>
            
            <h3 className="font-display text-4xl text-brand-dark mb-8 border-b-4 border-brand-yellow pb-2">Platillos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {menuData.platillos.map(item => <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />)}
            </div>

            <h3 className="font-display text-4xl text-brand-dark mb-8 border-b-4 border-brand-yellow pb-2">Bebidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuData.bebidas.map(item => <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />)}
            </div>
        </div>
    </section>
);

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItemData[];
    updateQuantity: (itemId: number, quantity: number) => void;
    removeFromCart: (itemId: number) => void;
    placeOrder: () => void;
}

const Cart = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, placeOrder }: CartProps) => {
    const [step, setStep] = useState(1); // 1 for cart, 2 for checkout, 3 for confirmation

    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
    const deliveryFee = 50;
    const total = subtotal + deliveryFee;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
        placeOrder();
    }
    
    useEffect(() => {
        if (isOpen) {
            setStep(1);
        }
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
            <div onClick={onClose} className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`fixed top-0 right-0 bottom-0 bg-white w-full max-w-md shadow-2xl transform transition-transform duration-500 ease-in-out cart-closed ${isOpen ? 'cart-open' : ''} flex flex-col md:top-0 md:bottom-0`}>
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="font-display text-3xl text-brand-blue">{step === 1 ? "Tu Orden" : (step === 2 ? "Checkout" : "¡Orden Recibida!")}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>

                {cart.length === 0 && step === 1 ? (
                    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                        <i className="fas fa-egg text-6xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-bold text-gray-700">Tu carrito está vacío</h3>
                        <p className="text-gray-500 mt-2">¡Agrega algo delicioso del menú para empezar!</p>
                    </div>
                ) : (
                    <>
                        {step === 1 && (
                             <div className="flex-grow overflow-y-auto p-6 space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover"/>
                                        <div className="flex-grow">
                                            <p className="font-bold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 bg-gray-200 rounded-full font-bold">-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 bg-gray-200 rounded-full font-bold">+</button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm hover:underline">Quitar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {step === 2 && (
                            <form onSubmit={handlePlaceOrder} className="flex-grow overflow-y-auto p-6 space-y-4">
                                <h3 className="font-bold text-lg mb-4">Detalles de Entrega</h3>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input type="text" id="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-yellow focus:border-brand-yellow" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (WhatsApp)</label>
                                    <input type="tel" id="phone" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-yellow focus:border-brand-yellow" />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lugar de Entrega</label>
                                    <select id="location" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-yellow focus:border-brand-yellow">
                                        <option>Aduana de Nogales</option>
                                        <option>Otro (Especificar en notas)</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notas Adicionales</label>
                                    <textarea id="notes" rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-yellow focus:border-brand-yellow"></textarea>
                                </div>
                                <h3 className="font-bold text-lg pt-4">Método de Pago</h3>
                                <button type="submit" className="w-full btn bg-black text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                                    <i className="fab fa-google-pay text-2xl"></i> Google Pay
                                </button>
                                <button type="submit" className="w-full btn bg-indigo-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                                    <i className="fab fa-stripe-s text-2xl"></i> Pagar con Tarjeta
                                </button>
                            </form>
                        )}
                        {step === 3 && (
                            <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                                <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center mb-6">
                                    <i className="fas fa-check text-5xl text-white"></i>
                                </div>
                                <h3 className="font-display text-3xl text-brand-dark">¡Gracias por tu orden!</h3>
                                <p className="text-gray-600 mt-2">Tu almuerzo va en camino. Te contactaremos por WhatsApp para confirmar. El tiempo estimado de entrega es de <span className="font-bold">25-35 minutos.</span></p>
                                <button onClick={onClose} className="mt-8 btn bg-brand-yellow text-brand-dark font-bold py-2 px-6 rounded-full">Cerrar</button>
                            </div>
                        )}

                        {step < 3 && cart.length > 0 && (
                            <div className="p-6 bg-gray-50 border-t">
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Envío</span><span>${deliveryFee.toFixed(2)}</span></div>
                                    <div className="flex justify-between font-bold text-lg text-black"><span>Total</span><span>${total.toFixed(2)}</span></div>
                                </div>
                                {step === 1 && (
                                    <button onClick={() => setStep(2)} className="w-full mt-4 btn bg-brand-yellow text-brand-dark py-3 rounded-lg font-bold text-lg">
                                        Proceder al Pago
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};


const ActionButtons = () => (
    <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-4">
        <a href="https://wa.me/521631XXXXXXX" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="action-fab btn w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600">
            <i className="fab fa-whatsapp text-4xl"></i>
        </a>
        <a href="tel:+52631XXXXXXX" aria-label="Call Us" className="action-fab btn w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600">
            <i className="fas fa-phone text-3xl"></i>
        </a>
    </div>
);


const Footer = () => (
    <footer className="bg-brand-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <img src="https://i.imgur.com/eB4Y1b6.jpeg" alt="Logo" className="w-24 h-24 mx-auto rounded-full mb-4"/>
            <p className="font-display text-2xl text-brand-yellow mb-4">A huevo es verde</p>
            <p className="text-gray-400">Acacia Frondosa, Nogales, Sonora C.P. 84093</p>
            <p className="text-gray-400 mt-2">&copy; {new Date().getFullYear()} A huevo es verde. Todos los derechos reservados.</p>
        </div>
    </footer>
);


const App = () => {
    // Fix: Specify type for cart state.
    const [cart, setCart] = useState<CartItemData[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    // Fix: Add types to function parameters.
    const addToCart = (itemToAdd: MenuItemData) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...itemToAdd, quantity: 1 }];
        });
    };

    // Fix: Add types to function parameters.
    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(itemId);
        } else {
            setCart(prevCart =>
                prevCart.map(item => (item.id === itemId ? { ...item, quantity } : item))
            );
        }
    };
    
    // Fix: Add types to function parameters.
    const removeFromCart = (itemId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const placeOrder = () => {
        // Here you would typically send the order to a backend
        console.log("Order placed:", cart);
        // Clear cart after a delay to show confirmation
        setTimeout(() => {
            setCart([]);
        }, 5000);
    };

    return (
        <>
            <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
            <main>
                <Hero />
                <Menu onAddToCart={addToCart} />
            </main>
            <Footer />
            <ActionButtons />
            <Cart 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                cart={cart} 
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                placeOrder={placeOrder}
            />
        </>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
