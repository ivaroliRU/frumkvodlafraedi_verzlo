CREATE TABLE products(
    id SERIAL NOT NULL PRIMARY KEY,
    name varchar(100) not null,
    image varchar(150) not null,
    price int not null
);

CREATE TABLE orderdetails(
    orderId varchar(20) not null primary key,
    FirstName varchar(50) not null,
    LastName varchar(50) not null,
    address varchar(50) not null,
    floor varchar(2),
    email varchar(50),
    phone varchar(8) not null,
    city varchar(50) not null,
    zip varchar(3) not null
);

CREATE TABLE ORDERS(
    id SERIAL NOT NULL PRIMARY KEY,
    detailID varchar(20),
    productID INT,
    sent BOOLEAN NOT NULL,
    FOREIGN KEY (detailID) REFERENCES orderdetails (orderId),
    FOREIGN KEY (productID) REFERENCES products (id)
);

CREATE TABLE CODES(
    id SERIAL NOT NULL PRIMARY KEY,
    code varchar(50) not null,
    discount int
);

INSERT INTO products(name, image, price) values
('Sylque Black', 'images/pillow2.png', 6000),
('Sylque White', 'images/pillow1.png', 6000),
('Sylque Pink', 'images/pillow3.png', 6000);