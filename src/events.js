import { filters, products } from '../assets/data/data.js';
import { renderFilters, renderProducts } from './menu.js';
import { filterProducts } from './searcher.js';
import {
    cart,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    renderCart,
} from './cart.js';
import { renderReceipt, showModal } from './receipt.js';

// --- Referencias al DOM -----------------------------------------------------
const filtersEl = document.getElementById('filters');
const productsEl = document.getElementById('products');
const cartButton = document.getElementById('cart');
const cartContainer = document.getElementById('cart-container');
const cartProductsEl = document.getElementById('cart-products');
const cartTotalEl = document.getElementById('cart-total');
const proceedPayButton = document.getElementById('proceedPay-button');
const receiptContainer = document.getElementById('receipt-container');

// --- Render inicial ---------------------------------------------------------
renderFilters(filters, filtersEl);
renderProducts(products, productsEl);
renderCart(cartProductsEl, cartTotalEl);

// --- Filtrar platos por categoría (delegación de eventos) -------------------
filtersEl.addEventListener('click', (event) => {
    const button = event.target.closest('.filter');
    if (!button) return;
    renderProducts(filterProducts(products, button.dataset.category), productsEl);
});

// --- Añadir un plato al carrito ---------------------------------------------
productsEl.addEventListener('click', (event) => {
    const button = event.target.closest('.add-button');
    if (!button) return;
    addItem(Number(button.dataset.id));
    renderCart(cartProductsEl, cartTotalEl);
});

// --- Abrir / cerrar el carrito lateral --------------------------------------
cartButton.addEventListener('click', () => {
    const isOpen = cartContainer.style.display === 'flex';
    cartContainer.style.display = isOpen ? 'none' : 'flex';
});

// --- Acciones dentro del carrito: eliminar, +, - (delegación) ---------------
cartProductsEl.addEventListener('click', (event) => {
    const id = Number(event.target.closest('[data-id]')?.dataset.id);
    if (event.target.closest('.close-button')) {
        removeItem(id);
    } else if (event.target.closest('.increase')) {
        increaseQuantity(id);
    } else if (event.target.closest('.decrease')) {
        decreaseQuantity(id);
    } else {
        return;
    }
    renderCart(cartProductsEl, cartTotalEl);
});

// --- Proceder al pago: mostrar el recibo ------------------------------------
proceedPayButton.addEventListener('click', () => {
    if (!cart.length) return;
    renderReceipt(cart, receiptContainer);
    receiptContainer.style.display = 'flex';
});

// --- Acciones del recibo: cerrar o pagar (delegación) -----------------------
receiptContainer.addEventListener('click', (event) => {
    if (event.target.closest('#close-receipt')) {
        receiptContainer.style.display = 'none';
        receiptContainer.innerHTML = '';
    } else if (event.target.closest('#pay-button')) {
        showModal(() => {
            // Al cerrar el modal, todo queda limpio.
            clearCart();
            renderCart(cartProductsEl, cartTotalEl);
            receiptContainer.style.display = 'none';
            receiptContainer.innerHTML = '';
        });
    }
});
