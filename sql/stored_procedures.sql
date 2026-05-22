-- =====================================================
-- Procedimientos Almacenados para Proyecto Poesía
-- Base de Datos II - Activity 2.4
-- =====================================================

USE poesia_db;

-- =====================================================
-- 1. Procedimiento: Poeta con sus Poemas (Poet-Poem)
-- =====================================================
DELIMITER $$

DROP PROCEDURE IF EXISTS sp_GetPoetWithPoems$$

CREATE PROCEDURE sp_GetPoetWithPoems(IN p_poet_code INT)
BEGIN
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
    LEFT JOIN Poem p ON po.poet_code = p.poet_code
    WHERE po.poet_code = p_poet_code;
END$$

DELIMITER ;


-- =====================================================
-- 2. Procedimiento: Ventas con Cliente (Sale-Customer)
-- =====================================================
DELIMITER $$

DROP PROCEDURE IF EXISTS sp_GetSaleWithCustomer$$

CREATE PROCEDURE sp_GetSaleWithCustomer(IN p_sale_code INT)
BEGIN
    SELECT
        s.sale_code,
        s.date,
        s.amount,
        c.customer_code,
        c.first_name,
        c.surname,
        c.address,
        c.postcode,
        c.telephone_number
    FROM Sale s
    INNER JOIN Customer c ON s.customer_code = c.customer_code
    WHERE s.sale_code = p_sale_code;
END$$

DELIMITER ;


-- =====================================================
-- 3. Procedimiento: Publicación con Poemas (Publication-Poem)
-- =====================================================
DELIMITER $$

DROP PROCEDURE IF EXISTS sp_GetPublicationWithPoems$$

CREATE PROCEDURE sp_GetPublicationWithPoems(IN p_publication_code INT)
BEGIN
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
    LEFT JOIN Poet po ON p.poet_code = po.poet_code
    WHERE pub.publication_code = p_publication_code;
END$$

DELIMITER ;


-- =====================================================
-- Consultas de prueba (opcional)
-- =====================================================
-- CALL sp_GetPoetWithPoems(1);
-- CALL sp_GetSaleWithCustomer(1);
-- CALL sp_GetPublicationWithPoems(1);
