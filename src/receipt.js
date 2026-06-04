//Aquí intenta poner las funcionalidades del recibo

import { getSubtotal, getTotal } from './cart.js';

// Plantilla de un plato dentro del recibo (con cantidad y subtotal).
const createReceiptItem = (item) => `
    <div class="receipt-product">
        <h3>${item.name}</h3>
        <div class="receipt-price">
            <p>Cantidad: ${item.quantity}</p>
            <h5>Subtotal ${getSubtotal(item).toFixed(2)} €</h5>
        </div>
    </div>`;

// Imprime el recibo completo dentro de su contenedor, manteniendo
// el botón de cerrar, el título, el total y el botón de pagar.
const renderReceipt = (cart, container) => {
    container.innerHTML = `
        <button class="close-button" id="close-receipt"><img src="./assets/img/close.svg" alt="close"></button>
        <h2 class="receipt-title">Recibo</h2>
        ${cart.map(createReceiptItem).join('')}
        <h3 id="receipt-total">Total: ${getTotal(cart).toFixed(2)} €</h3>
        <button class="pay-button" id="pay-button">Pagar</button>`;
};

// Crea y muestra el modal de confirmación de compra.
// Recibe un callback onClose que se ejecuta al cerrarlo (para limpiar todo).
const showModal = (onClose) => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-button" id="close-modal"><img src="./assets/img/close.svg" alt="close"></button>
            <h2 class="receipt-title">¡Gracias por tu compra! 🍣</h2>
            <p>Tu pedido está en preparación.</p>
        </div>`;

    const close = (event) => {
        // Se cierra al pulsar la X o al hacer click fuera del contenido.
        if (event.target.closest('#close-modal') || event.target === modal) {
            modal.remove();
            onClose();
        }
    };

    modal.addEventListener('click', close);
    document.body.appendChild(modal);
    return modal;
};

export { createReceiptItem, renderReceipt, showModal };
