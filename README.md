# 🍣 Kamakura Food

Aplicación web que dinamiza la carta del restaurante japonés **Kamakura Food** para permitir
pedidos online. El menú y los filtros se imprimen de forma **dinámica** a partir de los datos de
`assets/data/data.js`, e incluye un carrito de compras lateral, recibo y modal de confirmación.

> Si se añade un nuevo plato o categoría al array de datos, la interfaz lo mostrará
> automáticamente sin modificar el código.

## ✨ Funcionalidades

- 🍜 Impresión dinámica de los **platos** del menú (título, descripción y precio).
- 🏷️ Impresión dinámica de los **filtros** por categoría y filtrado al hacer click.
- 🛒 **Carrito lateral** que se abre y se cierra.
- ➕ Añadir un plato al carrito (sin duplicados).
- ❌ Eliminar un plato del carrito.
- 🔢 Aumentar / disminuir la cantidad de cada plato (al llegar a 0 se elimina).
- 💶 Cálculo automático del **subtotal** por plato y del **total**.
- 🧾 **Recibo** al proceder al pago con platos, cantidades, subtotales y total.
- 🪟 **Modal** de confirmación al pagar; al cerrarlo, el recibo y el carrito quedan limpios.

## 🛠️ Tecnologías

- **HTML5** y **CSS3** (proporcionados por la empresa).
- **JavaScript (ES6)** con ESModules: `map`, `filter`, `reduce`, `some`, `find` y *template strings*.
- **Vite** como servidor de desarrollo.
- **Vitest** + **jsdom** para los tests unitarios y de integración.

## 📁 Estructura

```
Kamakura-Food/
├── assets/
│   ├── data/data.js      # Datos del menú y filtros (no se modifica)
│   └── img/              # Logo e iconos
├── src/
│   ├── menu.js           # Render de filtros y platos
│   ├── searcher.js       # Filtrado de platos por categoría
│   ├── cart.js           # Estado y lógica del carrito + render
│   ├── receipt.js        # Recibo y modal
│   └── events.js         # Punto de entrada: eventos y orquestación
├── styles/               # menu.css y cart.css
├── tests/                # Tests con Vitest
└── index.html
```

## 🚀 Instalación y uso

```bash
npm install      # Instalar dependencias
npm run dev      # Levantar el servidor de desarrollo (Vite)
npm test         # Ejecutar los tests
```

Requisitos: Node v18+.

## 🧪 Tests

Tests **unitarios** (funciones puras: filtrado, subtotales, total, lógica del carrito y plantillas)
y de **integración** (renderizado real sobre el DOM con jsdom).

```bash
npm test
```

## 👥 Equipo

- Dhana Corredor

---

Proyecto formativo de **Factoría F5**.
