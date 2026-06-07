import { products } from '../assets/data/data.js';

// Estado del carrito: array de objetos { id, name, price, quantity }.
const cart = [];

// --- Lógica de datos (funciones puras / sobre el estado) -------------------

// Añade un plato al carrito. No permite duplicados.
// Devuelve true si lo añadió, false si ya estaba o no existe.
const addItem = (id) => {
    if (cart.some((item) => item.id === id)) return false;
    const product = products.find((product) => product.id === id);
    if (!product) return false;
    cart.push({ ...product, quantity: 1 });
    return true;
};

// Elimina por completo un plato del carrito.
const removeItem = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) cart.splice(index, 1);
};

// Aumenta la cantidad de un plato en 1.
const increaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) item.quantity += 1;
};

// Disminuye la cantidad de un plato en 1.
// Si la cantidad llega a 0, el plato se elimina del carrito.
const decreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;
    item.quantity -= 1;
    if (item.quantity <= 0) removeItem(id);
};

// Subtotal de un plato (precio x cantidad).
const getSubtotal = (item) => item.price * item.quantity;

// Total de todos los subtotales del carrito.
const getTotal = (items) =>
    items.reduce((total, item) => total + getSubtotal(item), 0);

// Vacía el carrito.
const clearCart = () => {
    cart.length = 0;
};

// --- Renderizado del DOM ----------------------------------------------------

// Plantilla de un plato dentro del carrito.
const createCartItem = ({ id, name, price, quantity }) => `
    <div class="cart-container" data-id="${id}">
        <button class="close-button" data-id="${id}"><img src="./assets/img/close.svg" alt="close"></button>
        <div class="text-container">
            <h3>${name}</h3>
            <h5>${price.toFixed(2)} €</h5>
        </div>
        <div class="quantity-container" id="quantity">
            <button class="increase" data-id="${id}">+</button>
            <p class="quantity">${quantity}</p>
            <button class="decrease" data-id="${id}">-</button>
        </div>
    </div>`;

// Imprime los platos del carrito y actualiza el total en pantalla.
const renderCart = (cartProductsEl, cartTotalEl) => {
    cartProductsEl.innerHTML = cart.length
        ? cart.map(createCartItem).join('')
        : '<h3>Añade un plato a tu menú</h3>';
    cartTotalEl.textContent = `Total: ${getTotal(cart).toFixed(2)} €`;
};

export {
    cart,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getSubtotal,
    getTotal,
    clearCart,
    createCartItem,
    renderCart,
};
