import { describe, test, expect, beforeEach, vi } from 'vitest';
import { filters, products } from '../assets/data/data.js';

// Reproduce la estructura mínima del index.html que necesita events.js.
const buildDOM = () => {
    document.body.innerHTML = `
        <button id="cart"></button>
        <section id="filters"></section>
        <div id="products"></div>
        <aside id="cart-container">
            <div id="cart-products"></div>
            <h2 id="cart-total"></h2>
            <button id="proceedPay-button"></button>
            <div id="receipt-container"></div>
        </aside>`;
};

// events.js ejecuta su lógica al importarse (render inicial + listeners),
// por eso construimos el DOM ANTES de importarlo y reseteamos los módulos
// en cada test para arrancar con un carrito limpio.
describe('events.js (integración)', () => {
    beforeEach(async () => {
        vi.resetModules();
        buildDOM();
        await import('../src/events.js');
    });

    test('al cargar imprime todos los filtros y todos los platos', () => {
        expect(document.querySelectorAll('#filters .filter')).toHaveLength(filters.length);
        expect(document.querySelectorAll('#products .product-container')).toHaveLength(products.length);
    });

    test('al hacer click en un filtro muestra solo los platos de esa categoría', () => {
        const ramenCount = products.filter((p) => p.category === 'ramen').length;
        document.querySelector('.filter[data-category="ramen"]').click();
        expect(document.querySelectorAll('#products .product-container')).toHaveLength(ramenCount);
    });

    test('al hacer click en "Añadir" el plato aparece en el carrito', () => {
        document.querySelector('.add-button').click();
        expect(document.querySelectorAll('#cart-products .cart-container')).toHaveLength(1);
    });

    test('el botón del carrito lo abre y lo cierra', () => {
        const cartContainer = document.getElementById('cart-container');
        const cartButton = document.getElementById('cart');

        cartButton.click();
        expect(cartContainer.style.display).toBe('flex');

        cartButton.click();
        expect(cartContainer.style.display).toBe('none');
    });

    test('"Proceder al pago" muestra el recibo con los platos del carrito', () => {
        document.querySelector('.add-button').click(); // añade un plato
        document.getElementById('proceedPay-button').click();

        const receipt = document.getElementById('receipt-container');
        expect(receipt.style.display).toBe('flex');
        expect(receipt.querySelectorAll('.receipt-product')).toHaveLength(1);
    });

    test('"Proceder al pago" no hace nada si el carrito está vacío', () => {
        document.getElementById('proceedPay-button').click();
        const receipt = document.getElementById('receipt-container');
        expect(receipt.style.display).not.toBe('flex');
        expect(receipt.querySelectorAll('.receipt-product')).toHaveLength(0);
    });
});
