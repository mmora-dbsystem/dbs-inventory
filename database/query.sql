CREATE DATABASE dbs_inventory;
USE dbs_inventory;
CREATE TABLE `usuarios` (
    `use_id` INT(11) NOT NULL auto_increment PRIMARY KEY,
    `use_nom` VARCHAR( 20 ) NOT NULL ,
    `use_ape` VARCHAR( 20 ) NOT NULL ,
    `use_cor` VARCHAR( 20 ) NOT NULL ,
    `use_cla` VARCHAR( 100 ) NOT NULL 
);
CREATE TABLE `programas` (
    `pro_id` INT(11) NOT NULL auto_increment PRIMARY KEY,
    `pro_nom` VARCHAR(100),
    `pro_ver` VARCHAR(100),
    `pro_det` VARCHAR(100),
    `pro_img` VARCHAR(100),
    `pro_url` VARCHAR(2500),
    `pro_use` INT(11),
    `pro_act` timestamp default current_timestamp,
    CONSTRAINT fk_usuario FOREIGN KEY (`pro_use`) REFERENCES `usuarios`(`use_id`)
);
DESCRIBE usuarios;