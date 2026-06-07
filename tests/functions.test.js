import { describe, test, expect, beforeEach } from 'vitest';
import { filters, products } from '../assets/data/data.js';
import { createFilter, createProductCard, renderFilters, renderProducts } from '../src/menu.js';
import { filterProducts } from '../src/searcher.js';
import {
    cart,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getSubtotal,
    getTotal,
    clearCart,
    renderCart,
} from '../src/cart.js';
import { createReceiptItem } from '../src/receipt.js';

// ---------------------------------------------------------------------------
// Tests unitarios: searcher (función pura de filtrado)
// ---------------------------------------------------------------------------
describe('filterProducts', () => {
    test("devuelve todos los platos cuando la categoría es 'todos'", () => {
        expect(filterProducts(products, 'todos')).toHaveLength(products.length);
    });

    test('devuelve solo los platos de la categoría indicada', () => {
        const ramen = filterProducts(products, 'ramen');
        expect(ramen.length).toBeGreaterThan(0);
        expect(ramen.every((product) => product.category === 'ramen')).toBe(true);
    });

    test('devuelve un array vacío si la categoría no existe', () => {
        expect(filterProducts(products, 'inexistente')).toHaveLength(0);
    });
});

// ---------------------------------------------------------------------------
// Tests unitarios: cálculos del carrito (funciones puras)
// ---------------------------------------------------------------------------
describe('cálculos del carrito', () => {
    test('getSubtotal multiplica precio por cantidad', () => {
        expect(getSubtotal({ price: 5, quantity: 3 })).toBe(15);
    });

    test('getTotal suma todos los subtotales', () => {
        const items = [
            { price: 5, quantity: 2 },
            { price: 10, quantity: 1 },
        ];
        expect(getTotal(items)).toBe(20);
    });

    test('getTotal de un carrito vacío es 0', () => {
        expect(getTotal([])).toBe(0);
    });
});

// ---------------------------------------------------------------------------
// Tests unitarios: lógica de estado del carrito
// ---------------------------------------------------------------------------
describe('estado del carrito', () => {
    beforeEach(() => clearCart());

    test('addItem añade un plato con cantidad 1', () => {
        addItem(0);
        expect(cart).toHaveLength(1);
        expect(cart[0].id).toBe(0);
        expect(cart[0].quantity).toBe(1);
    });

    test('no añade dos veces el mismo plato', () => {
        addItem(0);
        const added = addItem(0);
        expect(added).toBe(false);
        expect(cart).toHaveLength(1);
    });

    test('increaseQuantity aumenta la cantidad', () => {
        addItem(0);
        increaseQuantity(0);
        expect(cart[0].quantity).toBe(2);
    });

    test('decreaseQuantity disminuye la cantidad', () => {
        addItem(0);
        increaseQuantity(0);
        decreaseQuantity(0);
        expect(cart[0].quantity).toBe(1);
    });

    test('decreaseQuantity elimina el plato cuando llega a 0', () => {
        addItem(0);
        decreaseQuantity(0);
        expect(cart).toHaveLength(0);
    });

    test('removeItem elimina el plato del carrito', () => {
        addItem(0);
        addItem(2);
        removeItem(0);
        expect(cart).toHaveLength(1);
        expect(cart[0].id).toBe(2);
    });
});

// ---------------------------------------------------------------------------
// Tests unitarios: plantillas (template strings)
// ---------------------------------------------------------------------------
describe('plantillas', () => {
    test('createFilter incluye el nombre y la categoría', () => {
        const html = createFilter('ramen');
        expect(html).toContain('ramen');
        expect(html).toContain('data-category="ramen"');
    });

    test('createProductCard incluye nombre, descripción y precio', () => {
        const html = createProductCard(products[0]);
        expect(html).toContain(products[0].name);
        expect(html).toContain(products[0].description);
        expect(html).toContain('9.50 €');
    });

    test('createReceiptItem incluye la cantidad y el subtotal', () => {
        const html = createReceiptItem({ name: 'Miso Ramen', price: 9.5, quantity: 2 });
        expect(html).toContain('Cantidad: 2');
        expect(html).toContain('19.00 €');
    });
});

// ---------------------------------------------------------------------------
// Tests de integración: renderizado en el DOM
// ---------------------------------------------------------------------------
describe('integración con el DOM', () => {
    beforeEach(() => {
        clearCart();
        document.body.innerHTML = `
            <section id="filters"></section>
            <div id="products"></div>
            <div id="cart-products"></div>
            <h2 id="cart-total"></h2>`;
    });

    test('renderFilters imprime un botón por cada filtro', () => {
        renderFilters(filters, document.getElementById('filters'));
        expect(document.querySelectorAll('#filters .filter')).toHaveLength(filters.length);
    });

    test('renderProducts imprime una tarjeta por cada plato', () => {
        renderProducts(products, document.getElementById('products'));
        expect(document.querySelectorAll('#products .product-container')).toHaveLength(products.length);
    });

    test('renderCart muestra mensaje cuando el carrito está vacío', () => {
        renderCart(document.getElementById('cart-products'), document.getElementById('cart-total'));
        expect(document.getElementById('cart-products').textContent).toContain('Añade un plato');
        expect(document.getElementById('cart-total').textContent).toBe('Total: 0.00 €');
    });

    test('renderCart imprime los platos y el total correcto', () => {
        addItem(0); // Miso Ramen 9.50
        increaseQuantity(0); // x2 -> 19.00
        renderCart(document.getElementById('cart-products'), document.getElementById('cart-total'));
        expect(document.querySelectorAll('#cart-products .cart-container')).toHaveLength(1);
        expect(document.getElementById('cart-total').textContent).toBe('Total: 19.00 €');
    });

    test('no genera ids duplicados con varios platos en el carrito', () => {
        addItem(0);
        addItem(2);
        renderCart(document.getElementById('cart-products'), document.getElementById('cart-total'));
        // Los platos del carrito usan clases, no ids repetidos (HTML válido).
        expect(document.querySelectorAll('#cart-products [id="quantity"]')).toHaveLength(0);
    });
});
