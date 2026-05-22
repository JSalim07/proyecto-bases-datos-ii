-- =====================================================
-- Datos de prueba para Proyecto Poesía
-- Base de Datos II
-- =====================================================

USE poesia_db;

-- Insertar Poetas
INSERT INTO Poet (poet_code, first_name, surname, address, postcode, telephone_number) VALUES
(1, 'Pablo', 'Neruda', 'Isla Negra 123, Chile', '12345', '+56-9-1234-5678'),
(2, 'Gabriela', 'Mistral', 'Vicuña 456, Chile', '54321', '+56-9-8765-4321'),
(3, 'Federico', 'García Lorca', 'Granada 789, España', '18001', '+34-958-123-456'),
(4, 'Octavio', 'Paz', 'Calle Mixcoac 101, México', '03910', '+52-55-5555-1234'),
(5, 'Sor Juana', 'Inés de la Cruz', 'San Miguel Nepantla, México', '56350', '+52-55-5555-5678');

-- Insertar Poemas
INSERT INTO Poem (poem_code, poem_title, poem_contents, poet_code) VALUES
(1, 'Poema 20', 'Puedo escribir los versos más tristes esta noche...', 1),
(2, 'Oda al Amor', 'Amor, amor, amor, amor...', 1),
(3, 'Piececitos', 'Piececitos de niño, azulosos de frío...', 2),
(4, 'Todas íbamos a ser reinas', 'Todas íbamos a ser reinas...', 2),
(5, 'Romance Sonámbulo', 'Verde que te quiero verde...', 3),
(6, 'La Aurora', 'La aurora de Nueva York tiene...', 3),
(7, 'Piedra de Sol', 'Un sauce de cristal, un chopo de agua...', 4),
(8, 'Hombres Necios', 'Hombres necios que acusáis...', 5);

-- Insertar Publicaciones
INSERT INTO Publication (publication_code, title, price) VALUES
(1, 'Veinte Poemas de Amor', 25.99),
(2, 'Odas Elementales', 22.50),
(3, 'Desolación', 18.99),
(4, 'Tala', 19.99),
(5, 'Romancero Gitano', 30.00),
(6, 'Poeta en Nueva York', 28.50),
(7, 'Libertad Bajo Palabra', 35.00),
(8, 'Inundación Castálida', 20.00);

-- Insertar Clientes
INSERT INTO Customer (customer_code, first_name, surname, address, postcode, telephone_number) VALUES
(1, 'María', 'González', 'Av. Principal 123', '01000', '+52-55-1111-2222'),
(2, 'Juan', 'Rodríguez', 'Calle Secundaria 456', '02000', '+52-55-3333-4444'),
(3, 'Ana', 'Martínez', 'Boulevard Cultural 789', '03000', '+52-55-5555-6666'),
(4, 'Carlos', 'López', 'Paseo de la Reforma 101', '04000', '+52-55-7777-8888'),
(5, 'Laura', 'Hernández', 'Av. Insurgentes 202', '05000', '+52-55-9999-0000');

-- Insertar Ventas
INSERT INTO Sale (sale_code, date, amount, customer_code) VALUES
(1, '2024-01-15', 51.98, 1),
(2, '2024-02-20', 38.99, 2),
(3, '2024-03-10', 58.50, 3),
(4, '2024-04-05', 35.00, 4),
(5, '2024-05-12', 40.00, 5);

-- Relación Poem-Publication (muchos a muchos)
INSERT INTO Poem_Publication (poem_code, publication_code) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8);

-- Relación Sale-Publication (muchos a muchos)
INSERT INTO Sale_Publication (sale_code, publication_code) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(5, 8);
