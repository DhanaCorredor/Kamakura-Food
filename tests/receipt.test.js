import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderReceipt, showModal } from '../src/receipt.js';

// ---------------------------------------------------------------------------
// Tests del recibo: renderReceipt imprime los platos, el total y los botones
// ---------------------------------------------------------------------------
describe('renderReceipt', () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = '<div id="receipt-container"></div>';
        container = document.getElementById('receipt-container');
    });

    test('imprime un producto por cada plato del carrito', () => {
        const cart = [
            { name: 'Miso Ramen', price: 9.5, quantity: 2 },
            { name: 'Mochi', price: 2.5, quantity: 1 },
        ];
        renderReceipt(cart, container);
        expect(container.querySelectorAll('.receipt-product')).toHaveLength(2);
    });

    test('calcula y muestra el total correcto', () => {
        const cart = [
            { name: 'Miso Ramen', price: 9.5, quantity: 2 }, // 19.00
            { name: 'Mochi', price: 2.5, quantity: 1 }, // 2.50
        ];
        renderReceipt(cart, container);
        expect(container.querySelector('#receipt-total').textContent).toContain('21.50 €');
    });

    test('mantiene los botones de cerrar y pagar', () => {
        renderReceipt([{ name: 'Mochi', price: 2.5, quantity: 1 }], container);
        expect(container.querySelector('#close-receipt')).not.toBeNull();
        expect(container.querySelector('#pay-button')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------
// Tests del modal: se muestra, se cierra y ejecuta el callback de limpieza
// ---------------------------------------------------------------------------
describe('showModal', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('añade el modal al body', () => {
        showModal(() => {});
        expect(document.querySelector('.modal-overlay')).not.toBeNull();
    });

    test('al pulsar la X cierra el modal y ejecuta onClose', () => {
        const onClose = vi.fn();
        showModal(onClose);
        document.getElementById('close-modal').click();
        expect(document.querySelector('.modal-overlay')).toBeNull();
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('al hacer click fuera del contenido cierra el modal', () => {
        const onClose = vi.fn();
        const modal = showModal(onClose);
        modal.click(); // click sobre el overlay (event.target === modal)
        expect(document.querySelector('.modal-overlay')).toBeNull();
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('al hacer click dentro del contenido NO cierra el modal', () => {
        const onClose = vi.fn();
        const modal = showModal(onClose);
        modal.querySelector('.modal-content').click();
        expect(document.querySelector('.modal-overlay')).not.toBeNull();
        expect(onClose).not.toHaveBeenCalled();
    });
});
