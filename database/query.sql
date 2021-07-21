CREATE DATABASE dbs_inventory;
USE dbs_inventory;
CREATE TABLE `usuarios` (
    `usu_id` INT(11) NOT NULL auto_increment PRIMARY KEY,
    `usu_nom` VARCHAR( 20 ) NOT NULL ,
    `usu_ape` VARCHAR( 20 ) NOT NULL ,
    `usu_cor` VARCHAR( 20 ) NOT NULL ,
    `usu_cla` VARCHAR( 100 ) NOT NULL 
);
CREATE TABLE `programas` (
    `pro_id` INT(11) NOT NULL auto_increment PRIMARY KEY,
    `pro_nom` VARCHAR(100),
    `pro_ver` VARCHAR(100),
    `pro_det` VARCHAR(100),
    `pro_img` VARCHAR(100),
    `pro_url` VARCHAR(2500),
    `pro_com` INT(11),
    `pro_act` timestamp default current_timestamp--,
    --CONSTRAINT fk_usuario FOREIGN KEY (`pro_com`) REFERENCES `usuarios`(`usu_id`)
);
DESCRIBE usuarios;