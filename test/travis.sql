# Create Testuser
CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'dev'@'localhost';
# Create DB
CREATE DATABASE IF NOT EXISTS `demo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `demo`;

CREATE TABLE IF NOT EXISTS `kullanici` (
`k_id` INT UNIQUE NOT NULL AUTO_INCREMENT,
`isim` varchar(25),
`soyisim` varchar(25),
`eposta` varchar(100),
`dogum_tarihi` date,
`kayit_tarihi` date,
`sifre` varchar(25),
`ogr_no` int,
`telefon` int
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `randevu` (
`randevu_id` INT UNIQUE NOT NULL AUTO_INCREMENT,
`k_id` int,
`randevu_sahibi` varchar(50),
`olusturma_tarihi` date,
`randevu_tarihi` date,
`guncelleme_tarihi` date,
`kullanici_notu` varchar(250)
) ENGINE=InnoDB;

ALTER TABLE `randevu` 
  ADD FOREIGN KEY (`k_id`) REFERENCES `kullanici` (`k_id`);
ALTER TABLE `kullanici`
  ADD PRIMARY KEY (`k_id`);
  ALTER TABLE `randevu`
  ADD PRIMARY KEY (`randevu_id`);


INSERT INTO kullanici (isim,soyisim,eposta,dogum_tarihi,sifre, ogr_no, telefon) 
VALUES ("Travis","Test","travistest@hotmail.com","1998-05-05", "1234","1587452058","1111111111");
INSERT INTO randevu (randevu_tarihi,kullanici_notu) 
VALUES ("2020-05-01","Odev Kontrol");