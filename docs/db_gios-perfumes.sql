CREATE DATABASE `db_gios_perfumes`;

USE `db_gios_perfumes`;

CREATE TABLE roles (
    id BIGINT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT
);

CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    nombre VARCHAR(150),
    email VARCHAR(150),
    password VARCHAR(255),
    telefono VARCHAR(30),
    created_at TIMESTAMP
);

-- Tabla pivote: Relación de muchos a muchos (N:M) entre usuarios y roles.
-- Un usuario puede tener múltiples roles, y un rol pertenecer a múltiples usuarios.
CREATE TABLE user_roles (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    role_id BIGINT,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE brands (
    id BIGINT PRIMARY KEY,
    nombre VARCHAR(150),
    logo VARCHAR(255),
    descripcion TEXT,
    banner VARCHAR(255),
    pais_origen VARCHAR(100)
);

-- Categorías de los productos. 
-- Utiliza una relación recursiva (parent_id referenciando id) para permitir
-- subcategorías anidadas ilimitadas (ej. Perfumes -> Hombre -> Amaderados).
CREATE TABLE categories (
    id BIGINT PRIMARY KEY,
    nombre VARCHAR(150),
    descripcion TEXT,
    imagen VARCHAR(255),
    parent_id BIGINT,

-- Tabla base de productos.
-- category_id (1:N): Cada producto se asocia fuertemente a una categoría.
-- brand_id (1:N): Cada producto pertenece a una marca que lo produce.
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE TABLE products (
    id BIGINT PRIMARY KEY,
    brand_id BIGINT,
    category_id BIGINT,

    nombre VARCHAR(200),
    slug VARCHAR(255),
    descripcion TEXT,

    precio DECIMAL(10,2),
    precio_descuento DECIMAL(10,2),
    costo DECIMAL(10,2),

    sku VARCHAR(100),
    genero VARCHAR(50),
    familia_olfativa VARCHAR(100),
    concentracion VARCHAR(50),

    anio INT,
    pais_origen VARCHAR(100),

    estado VARCHAR(50),
    porcentaje_descuento INT,

    created_at TIMESTAMP,

    FOREIGN KEY (brand_id) REFERENCES brands(id),
-- Variantes de productos. Relación de 1 a muchísimos (1:N) con products.
-- Crucial para perfumería: El mismo perfume se agrupa bajo 'products',
-- pero vende en distintas presentaciones ('volumen' como 50ml, 100ml)
-- y cada variante tiene su propio stock y precio individual.
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_variants (
    id BIGINT PRIMARY KEY,
    product_id BIGINT,

    volumen VARCHAR(50),
    precio DECIMAL(10,2),

    stock INT,
    stock_minimo INT,
-- Imágenes asociadas al producto. Relación 1:N.
-- Permite tener múltiples ángulos del empaque. Una debe marcarse como 'principal'.

    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_images (
    id BIGINT PRIMARY KEY,
    product_id BIGINT,

    imagen VARCHAR(255),
    principal BOOLEAN,

    FOREIGN KEY (product_id) REFERENCES products(id)
);
-- Tabla pivote entre productos y etiquetas. Relación muchos a muchos (N:M).
-- Permite agrupar productos bajo características libres (ej. "Novedad", "Descontinuados").

CREATE TABLE tags (
    id BIGINT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE product_tags (
    id BIGINT PRIMARY KEY,
    product_id BIGINT,
    tag_id BIGINT,

-- Notas ofaltivas. Relación 1:N con products.
-- Almacena las especificaciones aromáticas (ej. tipo 'Salida', nota 'Bergamota' / tipo 'Corazón', nota 'Jazmín').
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

CREATE TABLE notes (
    id BIGINT PRIMARY KEY,
    product_id BIGINT,

    tipo VARCHAR(50),
    nota VARCHAR(100),
-- Carrito de compras. Relación 1:1 o 1:N con users.
-- Asocia un contenedor temporal (carrito) en sesión con un usuario antes de la orden definitiva.

    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE carts (
-- Elementos del carrito. Relación de muchos a 1 (N:1) hacia carts.
-- Ojo que apunta a `product_variants` porque el usuario no compra un producto genérico, 
-- sino una presentación específica de este (ej: frasco de 100ml).
    id BIGINT PRIMARY KEY,
    user_id BIGINT,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
    id BIGINT PRIMARY KEY,
    cart_id BIGINT,
    product_variant_id BIGINT,

-- Lista de deseos (Favoritos). 
-- Funciona como una tabla intermedia para una relación N:M entre `users` y `products`.
    cantidad INT,
    precio DECIMAL(10,2),

    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);

CREATE TABLE wishlists (
    id BIGINT PRIMARY KEY,
-- Libreta de direcciones. Relación 1:N vinculada a users.
-- Un comprador puede tener guardadas varias direcciones (facturación, oficina, hogar).
    user_id BIGINT,
    product_id BIGINT,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE addresses (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,

    pais VARCHAR(100),
-- Órdenes y pedidos finalizados. Relación 1:N con users.
-- El usuario conserva un historial de todos los pedidos emitidos a lo largo del tiempo.
    region VARCHAR(100),
    ciudad VARCHAR(100),
    codigo_postal VARCHAR(20),
    direccion TEXT,
    tipo VARCHAR(50),

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,

    estado VARCHAR(50),

    subtotal DECIMAL(10,2),
    envio DECIMAL(10,2),
    total DECIMAL(10,2),
-- Detalle de compra por pedido. Relación 1:N con 'orders'.
-- Apunta a la variante exacta y hace una 'fotografía' (snapshot) del precio y el total 
-- al momento de la compra, ya que este en el catálogo podría variar futuro.

    metodo_pago VARCHAR(100),
    guia_envio VARCHAR(100),

    created_at TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id BIGINT PRIMARY KEY,
    order_id BIGINT,
    product_variant_id BIGINT,

    cantidad INT,
    precio DECIMAL(10,2),
    total DECIMAL(10,2),

    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);

CREATE TABLE coupons (
    id BIGINT PRIMARY KEY,
    codigo VARCHAR(100),
-- Relación N:M entre órdenes y cupones. 
-- Sirve para guardar registro exacto de qué cupones (y más de uno si permitieran stack) aplican a qué compra.
    tipo VARCHAR(50),
    valor DECIMAL(10,2),

    fecha_inicio DATE,
    fecha_fin DATE,

    activo BOOLEAN
-- Reseñas y calificaciones. Tabla intermedia (N:M) de interacciones entre el usuario y un producto específico.
);

CREATE TABLE order_coupons (
    id BIGINT PRIMARY KEY,
    order_id BIGINT,
    coupon_id BIGINT,

    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);

CREATE TABLE reviews (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT,

    calificacion INT,
-- Historial de kardex / movimientos de almacén. Relación 1:N con product_variants.
-- Garantiza trazabilidad de por qué incrementó o bajó el stock físico (compras, ajustes, mermas).
    comentario TEXT,

    aprobado BOOLEAN,

    created_at TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE inventory_movements (
    id BIGINT PRIMARY KEY,
    product_variant_id BIGINT,

    tipo VARCHAR(50),
    cantidad INT,
    descripcion TEXT,

    created_at TIMESTAMP,

    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);

CREATE TABLE banners (
    id BIGINT PRIMARY KEY,

    titulo VARCHAR(200),
    imagen VARCHAR(255),
    link VARCHAR(255),

    activo BOOLEAN
);