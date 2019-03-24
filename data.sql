drop table orders;
drop table orderdetails;
drop table products;
drop table codes;

CREATE TABLE products(
    id SERIAL NOT NULL PRIMARY KEY,
    name varchar(100) not null,
    image varchar(150) not null,
    price int not null,
    stock int not null
);

CREATE TABLE CODES(
    id SERIAL NOT NULL PRIMARY KEY,
    code varchar(50) not null,
    discount int
);

CREATE TABLE orderdetails(
    orderId varchar(20) not null primary key,
    FirstName varchar(50) not null,
    LastName varchar(50) not null,
    address varchar(50) not null,
    floor varchar(3),
    email varchar(100),
    phone varchar(8) not null,
    city varchar(50) not null,
    zip varchar(3) not null,
    codeID int null,
    sent BOOLEAN NOT NULL,
    paid BOOLEAN NOT NULL,
    sOption varchar(30) NOT NULL,
    FOREIGN KEY (codeID) REFERENCES codes (id)
);

CREATE TABLE ORDERS(
    id SERIAL NOT NULL PRIMARY KEY,
    detailID varchar(20),
    productID INT,
    FOREIGN KEY (detailID) REFERENCES orderdetails (orderId),
    FOREIGN KEY (productID) REFERENCES products (id)
);

INSERT INTO products(name, image, price, stock) values
('Sylque Black', 'assets/images/pillow2.jpg', 6990, 10),
('Sylque White', 'assets/images/pillow1.jpg', 6990, 10),
('Sylque Pink', 'assets/images/pillow3.jpg', 6990, 5);


UPDATE products SET price = 6990 WHERE ID > 0;
UPDATE products SET name = 'Blanco' WHERE ID = 2;
UPDATE products SET name = 'Rosé' WHERE ID = 3;


UPDATE products SET stock = 10 WHERE ID = 1;
UPDATE products SET stock = 8 WHERE ID = 2;
UPDATE products SET stock = 5 WHERE ID = 3;


SELECT p.name, p.price
from orders o
join products p on p.id = o.productID
where o.detailId = 'jtftlws9';

--Procedure
DROP TRIGGER IF EXISTS updateStock ON orders;
DROP FUNCTION IF EXISTS updateStock();

CREATE OR REPLACE FUNCTION updateStock()RETURNS TRIGGER 
AS $$
DECLARE
    prev_stock INT;
BEGIN
    prev_stock := (SELECT P.stock
    FROM products P
    WHERE P.id = NEW.productID);

    IF prev_stock <= 0 THEN
        RAISE EXCEPTION 'No Event with that ID'
        USING ERRCODE = '45000';
    END IF;

    UPDATE Products P
    SET stock = prev_stock - 1
    WHERE id = NEW.productID;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER updateStock
    BEFORE INSERT OR UPDATE ON orders
    FOR EACH ROW
        execute procedure updateStock();