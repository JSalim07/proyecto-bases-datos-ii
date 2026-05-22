-- =====================================================
-- Vistas (Views) para Proyecto Poesía
-- Base de Datos II - Basadas en Procedimientos Almacenados
-- =====================================================

USE poesia_db;

-- =====================================================
-- 1. Vista: Poeta con sus Poemas (Poet-Poem)
-- =====================================================
CREATE OR REPLACE VIEW vw_PoetWithPoems AS
SELECT
    po.poet_code,
    po.first_name,
    po.surname,
    po.address,
    po.postcode,
    po.telephone_number,
    p.poem_code,
    p.poem_title,
    p.poem_contents
FROM Poet po
LEFT JOIN Poem p ON po.poet_code = p.poet_code;

-- Consulta de ejemplo:
-- SELECT * FROM vw_PoetWithPoems WHERE poet_code = 1;


-- =====================================================
-- 2. Vista: Ventas con Cliente (Sale-Customer)
-- =====================================================
CREATE OR REPLACE VIEW vw_SaleWithCustomer AS
SELECT
    s.sale_code,
    s.date AS sale_date,
    s.amount AS sale_amount,
    c.customer_code,
    c.first_name AS customer_first_name,
    c.surname AS customer_surname,
    c.address AS customer_address,
    c.postcode AS customer_postcode,
    c.telephone_number AS customer_telephone
FROM Sale s
INNER JOIN Customer c ON s.customer_code = c.customer_code;

-- Consulta de ejemplo:
-- SELECT * FROM vw_SaleWithCustomer WHERE sale_code = 1;


-- =====================================================
-- 3. Vista: Publicación con Poemas (Publication-Poem)
-- =====================================================
CREATE OR REPLACE VIEW vw_PublicationWithPoems AS
SELECT
    pub.publication_code,
    pub.title AS publication_title,
    pub.price AS publication_price,
    p.poem_code,
    p.poem_title,
    p.poem_contents,
    po.poet_code,
    po.first_name AS poet_first_name,
    po.surname AS poet_surname
FROM Publication pub
LEFT JOIN Poem_Publication pp ON pub.publication_code = pp.publication_code
LEFT JOIN Poem p ON pp.poem_code = p.poem_code
LEFT JOIN Poet po ON p.poet_code = po.poet_code;

-- Consulta de ejemplo:
-- SELECT * FROM vw_PublicationWithPoems WHERE publication_code = 1;


-- =====================================================
-- Consultas de prueba para todas las vistas
-- =====================================================

-- Ver todos los poetas con sus poemas
-- SELECT * FROM vw_PoetWithPoems;

-- Ver todas las ventas con clientes
-- SELECT * FROM vw_SaleWithCustomer;

-- Ver todas las publicaciones con poemas y poetas
-- SELECT * FROM vw_PublicationWithPoems;

-- Filtrar por ID específico
-- SELECT * FROM vw_PoetWithPoems WHERE poet_code = 1;
-- SELECT * FROM vw_SaleWithCustomer WHERE sale_code = 1;
-- SELECT * FROM vw_PublicationWithPoems WHERE publication_code = 1;
