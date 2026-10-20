CREATE DATABASE IF NOT EXISTS konyvtar_db
CHARACTER SET UTF8
COLLATE utf8_hungarian_ci;

USE konyvtar_db;

CREATE TABLE IF NOT EXISTS mufajok (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nev varchar(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS konyvek(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    mufaj_id int(11) NOT NULL,
    cim varchar(150) NOT NULL,
    kiadasi_ev int(5) NOT NULL,
    oldalszam int(4) NOT NULL,
    kolcsonozheto boolean NOT NULL,
    FOREIGN KEY (mufaj_id) REFERENCES mufajok(id)
);

INSERT INTO mufajok (nev) VALUES
("Sci-Fi"), ("Történelem"), ("Krimi");

INSERT INTO konyvek (mufaj_id, cim, kiadasi_ev, oldalszam, kolcsonozheto) VALUES
(1, "Dűne Krónikái", 1965, 680, 1),
(1, "Alapítvány és Birodalom", 1952, 280, 1),
(1, "Neurománc cyber trilógia", 1984, 320, 0),
(2, "A középkor alkonya", 1919, 410, 1),
(2, "Róma tündöklése és bukása", 1998, 540, 1),
(2, "Mohácsi csata oknyomozása", 2010, 190, 0),
(3, "Tíz kicsi néger rejtélye", 1939, 220, 1),
(3, "A Da Vinci-kód", 2003, 590, 1),
(3, "A sátán kutyája klasszikus", 1902, 180, 0),
(1, "Csillagközi invázió harcosai", 1959, 260, 1)