CREATE DATABASE Plants;

CREATE TABLE Product
(
	ID CHAR(36) NOT NULL PRIMARY KEY,
	CategoryID CHAR(36) NOT NULL,
	IsAvailable BOOL,
	Name TEXT,
	Description TEXT,
	ImagePath TEXT,
	Price INT
);

CREATE TABLE Category
(
	ID CHAR(36) NOT NULL PRIMARY KEY,
	Name TEXT,
	Description TEXT,
	ImagePath TEXT
);

CREATE TABLE Admin
(
	ID CHAR(36) NOT NULL PRIMARY KEY,
	Login TEXT,
	Password TEXT
);

CREATE TABLE Order
(
	ID CHAR(36) NOT NULL PRIMARY KEY,
	DateCreated DATETIME,
	Status CH
);

INSERT INTO Admin (ID, Login, Password)
VALUES ('cb5cc5cd-085d-4a04-94df-2780aa0b150e', 'Moroshan', 'moroztaushan23');
