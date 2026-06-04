//DEBE buscar los productos por los filtros

// Devuelve los platos que pertenecen a la categoría indicada.
// Si la categoría es 'todos', devuelve el menú completo.
// Es una función pura: no toca el DOM, solo transforma datos (fácil de testear).
const filterProducts = (products, category) =>
    category === 'todos'
        ? products
        : products.filter((product) => product.category === category);

export { filterProducts };
