// Plantilla de un botón de filtro.
const createFilter = (filter) =>
    `<button class="filter" data-category="${filter}">${filter}</button>`;

// Plantilla de la tarjeta de un plato del menú.
const createProductCard = ({ id, name, description, price }) => `
    <div class="product-container">
        <h3>${name}</h3>
        <p>${description}</p>
        <div class="price-container">
            <h5>${price.toFixed(2)} €</h5>
            <button class="add-button" data-id="${id}">Añadir</button>
        </div>
    </div>`;

// Imprime de forma dinámica todos los filtros de categorías.
const renderFilters = (filters, container) => {
    container.innerHTML = filters.map(createFilter).join('');
};

// Imprime de forma dinámica los platos recibidos.
const renderProducts = (products, container) => {
    container.innerHTML = products.map(createProductCard).join('');
};

export { createFilter, createProductCard, renderFilters, renderProducts };
