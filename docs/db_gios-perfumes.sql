CREATE DATABASE `db_gios_perfumes`;

USE `db_gios_perfumes`;

CREATE TABLE ROLES (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE USERS (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(255),
    created_at TIMESTAMP
);

-- Tabla pivote: Relación de muchos a muchos (N:M) entre usuarios y roles.
-- Un usuario puede tener múltiples roles, y un rol pertenecer a múltiples usuarios.
CREATE TABLE USER_ROLES (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    role_id BIGINT,
    
    FOREIGN KEY (user_id) REFERENCES USERS(id),
    FOREIGN KEY (role_id) REFERENCES ROLES(id)
);

CREATE TABLE BRANDS (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    logo VARCHAR(255),
    description TEXT,
    banner VARCHAR(255),
    country_of_origin VARCHAR(255)
);

-- Categorías de los productos. 
-- Utiliza una relación recursiva (parent_id referenciando id) para permitir
-- subcategorías anidadas ilimitadas (ej. Perfumes -> Hombre -> Amaderados).
CREATE TABLE CATEGORIES (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    parent_id BIGINT,

    FOREIGN KEY (parent_id) REFERENCES CATEGORIES(id)
);

-- Tabla base de productos.
-- category_id (1:N): Cada producto se asocia fuertemente a una categoría.
-- brand_id (1:N): Cada producto pertenece a una marca que lo produce.
-- NOTA: el precio, costo y descuento NO viven aquí. Cada presentación (50ml,
-- 100ml, etc.) tiene precio propio en PRODUCT_VARIANTS. El "desde" del catálogo
-- se calcula con MIN(product_variants.price).
CREATE TABLE PRODUCTS (
    id BIGINT PRIMARY KEY,
    brand_id BIGINT,
    category_id BIGINT,

    name VARCHAR(255),
    slug VARCHAR(255),
    description TEXT,

    sku VARCHAR(255),
    gender VARCHAR(255),
    olfactory_family VARCHAR(255),
    concentration VARCHAR(255),

    year INT,
    country_of_origin VARCHAR(255),

    status VARCHAR(255),

    created_at TIMESTAMP,

    FOREIGN KEY (brand_id) REFERENCES BRANDS(id),
    FOREIGN KEY (category_id) REFERENCES CATEGORIES(id)
);

-- Variantes de productos. Relación de 1 a muchísimos (1:N) con products.
-- Crucial para perfumería: El mismo perfume se agrupa bajo 'products',
-- pero se vende en distintas presentaciones ('volumen' como 50ml, 100ml)
-- y cada variante tiene su propio stock, precio, costo y descuento.
CREATE TABLE PRODUCT_VARIANTS (
    id BIGINT PRIMARY KEY,
    product_id BIGINT,

    volume VARCHAR(255),

    price DECIMAL(10,2),
    discount_price DECIMAL(10,2),
    cost DECIMAL(10,2),

    stock INT,
    min_stock INT,

    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id)
);

-- Imágenes asociadas al producto. Relación 1:N.
-- Permite tener múltiples ángulos del empaque. Una debe marcarse como 'principal'.
CREATE TABLE PRODUCT_IMAGES (
    id BIGINT PRIMARY KEY,
    product_id BIGINT,

    image VARCHAR(255),
    is_main BOOLEAN,

    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id)
);

-- Tabla pivote entre productos y etiquetas. Relación muchos a muchos (N:M).
-- Permite agrupar productos bajo características libres (ej. "Novedad", "Descontinuados").
CREATE TABLE TAGS (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE PRODUCT_TAGS (
    id BIGINT PRIMARY KEY,
    product_id BIGINT,
    tag_id BIGINT,

    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id),
    FOREIGN KEY (tag_id) REFERENCES TAGS(id)
);

-- Catálogo global de notas olfativas.
-- Se normaliza para evitar duplicación (ej. "Bergamota" se reutiliza en muchos productos).
CREATE TABLE NOTES (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    slug VARCHAR(255),
    description TEXT,
    image VARCHAR(255)
);

-- Catálogo de tipos de nota (Salida, Corazón, Fondo).
CREATE TABLE NOTE_TYPES (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    slug VARCHAR(255)
);

-- Tabla pivote N:M entre productos y notas.
-- Permite indicar tipo de nota y orden/intensidad dentro de la pirámide olfativa.
CREATE TABLE PRODUCT_NOTES (
    id BIGINT PRIMARY KEY,
    product_id BIGINT,
    note_id BIGINT,
    note_type_id BIGINT,
    position INT,
    intensity INT,

    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id),
    FOREIGN KEY (note_id) REFERENCES NOTES(id),
    FOREIGN KEY (note_type_id) REFERENCES NOTE_TYPES(id)
);

-- Carrito de compras. Relación 1:1 o 1:N con users.
-- Asocia un contenedor temporal (carrito) en sesión con un usuario antes de la orden definitiva.
CREATE TABLE CARTS (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,

    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

-- Elementos del carrito. Relación de muchos a 1 (N:1) hacia carts.
-- Ojo que apunta a `product_variants` porque el usuario no compra un producto genérico, 
-- sino una presentación específica de este (ej: frasco de 100ml).
CREATE TABLE CART_ITEMS (
    id BIGINT PRIMARY KEY,
    cart_id BIGINT,
    product_variant_id BIGINT,

    quantity INT,
    price DECIMAL(10,2),

    FOREIGN KEY (cart_id) REFERENCES CARTS(id),
    FOREIGN KEY (product_variant_id) REFERENCES PRODUCT_VARIANTS(id)
);

-- Lista de deseos (Favoritos). 
-- Funciona como una tabla intermedia para una relación N:M entre `users` y `products`.
CREATE TABLE WISHLISTS (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT,

    FOREIGN KEY (user_id) REFERENCES USERS(id),
    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id)
);

-- Libreta de direcciones. Relación 1:N vinculada a users.
-- Un comprador puede tener guardadas varias direcciones (facturación, oficina, hogar).
CREATE TABLE ADDRESSES (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,

    country VARCHAR(255),
    region VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(255),
    address VARCHAR(255),
    type VARCHAR(255),

    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

-- Órdenes y pedidos finalizados. Relación 1:N con users.
-- El usuario conserva un historial de todos los pedidos emitidos a lo largo del tiempo.
CREATE TABLE ORDERS (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,

    status VARCHAR(255),

    subtotal DECIMAL(10,2),
    shipping DECIMAL(10,2),
    total DECIMAL(10,2),

    payment_method VARCHAR(255),
    tracking_number VARCHAR(255),

    created_at TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

-- Detalle de compra por pedido. Relación 1:N con 'orders'.
-- Apunta a la variante exacta y hace una 'fotografía' (snapshot) del precio y el total 
-- al momento de la compra, ya que este en el catálogo podría variar futuro.
CREATE TABLE ORDER_ITEMS (
    id BIGINT PRIMARY KEY,
    order_id BIGINT,
    product_variant_id BIGINT,

    quantity INT,
    price DECIMAL(10,2),
    total DECIMAL(10,2),

    FOREIGN KEY (order_id) REFERENCES ORDERS(id),
    FOREIGN KEY (product_variant_id) REFERENCES PRODUCT_VARIANTS(id)
);

CREATE TABLE COUPONS (
    id BIGINT PRIMARY KEY,
    code VARCHAR(255),
    type VARCHAR(255),
    value DECIMAL(10,2),

    start_date DATE,
    end_date DATE,

    active BOOLEAN
);

-- Relación N:M entre órdenes y cupones. 
-- Sirve para guardar registro exacto de qué cupones (y más de uno si permitieran stack) aplican a qué compra.
CREATE TABLE ORDER_COUPONS (
    id BIGINT PRIMARY KEY,
    order_id BIGINT,
    coupon_id BIGINT,

    FOREIGN KEY (order_id) REFERENCES ORDERS(id),
    FOREIGN KEY (coupon_id) REFERENCES COUPONS(id)
);

-- Reseñas y calificaciones. Tabla intermedia (N:M) de interacciones entre el usuario y un producto específico.
CREATE TABLE REVIEWS (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT,

    rating INT,
    comment TEXT,

    approved BOOLEAN,

    created_at TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES USERS(id),
    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id)
);

-- Historial de kardex / movimientos de almacén. Relación 1:N con product_variants.
-- Garantiza trazabilidad de por qué incrementó o bajó el stock físico (compras, ajustes, mermas).
CREATE TABLE INVENTORY_MOVEMENTS (
    id BIGINT PRIMARY KEY,
    product_variant_id BIGINT,

    type VARCHAR(255),
    quantity INT,
    description TEXT,

    created_at TIMESTAMP,

    FOREIGN KEY (product_variant_id) REFERENCES PRODUCT_VARIANTS(id)
);

CREATE TABLE BANNERS (
    id BIGINT PRIMARY KEY,

    title VARCHAR(255),
    image VARCHAR(255),
    link VARCHAR(255),

    active BOOLEAN
);
