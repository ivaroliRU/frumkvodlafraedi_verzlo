drop table orders;
drop table orderdetails;
drop table products;
drop table codes;

CREATE TABLE products(
    id SERIAL NOT NULL PRIMARY KEY,
    name varchar(100) not null,
    image varchar(150) not null,
    price int not null
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

INSERT INTO products(name, image, price) values
('Sylque Black', 'assets/images/pillow2.jpg', 6990),
('Sylque White', 'assets/images/pillow1.jpg', 6990),
('Sylque Pink', 'assets/images/pillow3.jpg', 6990);


UPDATE products SET price = 6990 WHERE ID > 0;
UPDATE products SET image = 'assets/images/pillow2.jpg' WHERE ID = 1;
UPDATE products SET image = 'assets/images/pillow1.jpg' WHERE ID = 2;
UPDATE products SET image = 'assets/images/pillow3.jpg' WHERE ID = 3;