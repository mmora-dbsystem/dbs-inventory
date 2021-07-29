CREATE DATABASE dbs_inventory;
USE dbs_inventory;

CREATE TABLE `usuarios` (
    `usu_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `usu_nom` VARCHAR( 100 ) ,
    `usu_ape` VARCHAR( 100 ) ,
    `usu_cco` VARCHAR( 100 ) ,
    `usu_cpe` VARCHAR( 100 ) ,
    `usu_cla` VARCHAR( 100 ) ,
    `usu_tus` VARCHAR( 100 ) ,
    `usu_eus` VARCHAR( 100 )
);
INSERT INTO `dbs_inventory`.`usuarios` (`usu_id` ,`usu_nom`, `usu_ape` , `usu_cco`, `usu_cpe`, `usu_cla` , `usu_tus` ,`usu_eus`) 
VALUES ('1', 'Administrador', 'DBS Inventory', 'dbsinventory@db-system.com', 'dbsinventory@db-system.com', '$2a$10$kA7ZMG1JrjX3Od.ZdwzkFuhUSq.spfgrs/RPzrCeLM0RYK2gJe6AG', 'Administrador', 'Activo');
CREATE TABLE `urls_ti` (
    `url_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `url_nom` VARCHAR( 100 ) NOT NULL ,
    `url_url` VARCHAR( 100 ) NOT NULL ,
    `url_det` VARCHAR( 100 ) NOT NULL ,
    `url_usu` VARCHAR( 100 ) NOT NULL ,
    `url_cla` VARCHAR( 100 ) NOT NULL ,
    `url_act` timestamp default current_timestamp 
);
CREATE TABLE `software_base` (
    `swb_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `swb_nom` VARCHAR(100),
    `swb_ver` VARCHAR(100),
    `swb_det` VARCHAR(100),
    `swb_img` VARCHAR(100),
    `swb_url` VARCHAR(2500),
    `swb_com` INT(100),
    `swb_act` timestamp default current_timestamp
);
CREATE TABLE `portatiles_hardware` (
    `phw_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `phw_est` VARCHAR(100),
    `phw_ipt` VARCHAR(100),
    `phw_ser` VARCHAR(100),
    `phw_hma` VARCHAR(100),
    `phw_hmo` VARCHAR(100),
    `phw_hmp` VARCHAR(100),
    `phw_hvp` VARCHAR(100),
    `phw_hap` VARCHAR(100),
    `phw_hmt` VARCHAR(100),
    `phw_hmr` VARCHAR(100),
    `phw_hdt` VARCHAR(100),
    `phw_hdr` VARCHAR(100),
    `phw_hme` VARCHAR(100),
    `phw_hmw` VARCHAR(100),
    `phw_obs` VARCHAR(100),
    `phw_img` VARCHAR(100)
);
CREATE TABLE `portatiles_software` (
    `psw_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `psw_ipt` VARCHAR(100),
    `psw_son` VARCHAR(100),
    `psw_sov` VARCHAR(100),
    `psw_soe` VARCHAR(100),
    `psw_soi` VARCHAR(100),
    `psw_sok` VARCHAR(100),
    `psw_ibi` VARCHAR(100)
);
CREATE TABLE `portatiles_soporte_remoto` (
    `psr_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `psr_ipt` VARCHAR(100),
    `psr_ida` VARCHAR(100),
    `psr_cla` VARCHAR(100)
);
CREATE TABLE `portatiles_dispositivos_adicionales` (
    `pda_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `pda_ipt` VARCHAR(100),
    `pda_mou` VARCHAR(100),
    `pda_pmo` VARCHAR(100),  
    `pda_tec` VARCHAR(100),    
    `pda_bas` VARCHAR(100),    
    `pda_gua` VARCHAR(100),    
    `pda_cgu` VARCHAR(100),    
    `pda_pan` VARCHAR(100),    
    `pda_uet` VARCHAR(100),
    `pda_obs` VARCHAR(100)
 );
CREATE TABLE `portatiles_informacion_administrativa` (
    `pia_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `pia_ipt` VARCHAR(100),
    `pia_ven` VARCHAR(100),
    `pia_fco` timestamp default current_timestamp,
    `pia_cos` VARCHAR(100),
    `pia_gar` VARCHAR(100)
);
CREATE TABLE `asignacion_portatiles` (
    `apo_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `apo_ipt` VARCHAR(100),
    `apo_con` VARCHAR(100),
    `apo_did` VARCHAR(100),
    `apo_exp` VARCHAR(100),
    `apo_cco` VARCHAR(100),
    `apo_cpe` VARCHAR(100),
    `apo_are` VARCHAR(100),
    `apo_car` VARCHAR(100),
    `apo_pro` VARCHAR(100),
    `apo_ubi` VARCHAR(100),
    `apo_fas` timestamp default current_timestamp
);
CREATE TABLE `escritorio_hardware` (
    `ehw_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `ehw_est` VARCHAR(100),
    `ehw_ipc` VARCHAR(100),
    `ehw_ser` VARCHAR(100),
    `ehw_hma` VARCHAR(100),
    `ehw_hmo` VARCHAR(100),
    `ehw_hmp` VARCHAR(100),
    `ehw_hvp` VARCHAR(100),
    `ehw_hap` VARCHAR(100),
    `ehw_hmt` VARCHAR(100),
    `ehw_hmr` VARCHAR(100),
    `ehw_hdt` VARCHAR(100),
    `ehw_hdr` VARCHAR(100),
    `ehw_hme` VARCHAR(100),
    `ehw_hmw` VARCHAR(100),
    `ehw_obs` VARCHAR(100),
    `ehw_img` VARCHAR(100)
);
CREATE TABLE `escritorio_software` (
    `esw_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `esw_ipc` VARCHAR(100),
    `esw_son` VARCHAR(100),
    `esw_sov` VARCHAR(100),
    `esw_soe` VARCHAR(100),
    `esw_soi` VARCHAR(100),
    `esw_sok` VARCHAR(100),
    `esw_ibi` VARCHAR(100)
);
CREATE TABLE `escritorio_soporte_remoto` (
    `esr_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `esr_ipc` VARCHAR(100),
    `esr_ida` VARCHAR(100),
    `esr_cla` VARCHAR(100)
);
CREATE TABLE `escritorio_dispositivos_adicionales` (
    `eda_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `eda_ipc` VARCHAR(100),
    `eda_mou` VARCHAR(100),
    `eda_pmo` VARCHAR(100),  
    `eda_tec` VARCHAR(100),    
    `eda_bas` VARCHAR(100),    
    `eda_gua` VARCHAR(100),    
    `eda_cgu` VARCHAR(100),    
    `eda_pan` VARCHAR(100),    
    `eda_uet` VARCHAR(100),
    `eda_obs` VARCHAR(100)
);
CREATE TABLE `escritorio_informacion_administrativa` (
    `eia_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `eia_ipc` VARCHAR(100),
    `eia_ven` VARCHAR(100),
    `eia_fco` timestamp default current_timestamp,
    `eia_cos` VARCHAR(100),
    `eia_gar` VARCHAR(100)
);
CREATE TABLE `asignacion_escritorio` (
    `aes_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `aes_ipc` VARCHAR(100),
    `aes_con` VARCHAR(100),
    `aes_did` VARCHAR(100),
    `aes_exp` VARCHAR(100),
    `aes_cco` VARCHAR(100),
    `aes_cpe` VARCHAR(100),
    `aes_are` VARCHAR(100),
    `aes_car` VARCHAR(100),
    `aes_pro` VARCHAR(100),
    `aes_ubi` VARCHAR(100),
    `aes_fas` timestamp default current_timestamp
);
CREATE TABLE `servidores_hardware` (
    `ise_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `ise_est` VARCHAR(100),
    `ise_ise` VARCHAR(100),
    `ise_ser` VARCHAR(100),
    `ise_mar` VARCHAR(100),
    `ise_mod` VARCHAR(100),
    `iim_pro` VARCHAR(100),
    `iim_cpu` VARCHAR(100),
    `iim_ram` VARCHAR(100),
    `iim_dis` VARCHAR(100),
    `iim_obs` VARCHAR(100)
);
CREATE TABLE `servidores_software` (
    `ssf_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `ssf_ise` VARCHAR(100),
    `ssf_son` VARCHAR(100),
    `ssf_sov` VARCHAR(100),
    `ssf_soe` VARCHAR(100),
    `ssf_soi` VARCHAR(100),
    `ssf_sok` VARCHAR(100),
    `ssf_ibi` VARCHAR(100)
);
CREATE TABLE `servidores_dispositivos_adicionales` (
    `sda_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `sda_ipc` VARCHAR(100),
    `sda_mou` VARCHAR(100),
    `sda_pmo` VARCHAR(100),  
    `sda_tec` VARCHAR(100),    
    `sda_bas` VARCHAR(100),    
    `sda_gua` VARCHAR(100),    
    `sda_cgu` VARCHAR(100),    
    `sda_pan` VARCHAR(100),    
    `sda_uet` VARCHAR(100),
    `sda_obs` VARCHAR(100)
);
CREATE TABLE `servidores_informacion_administrativa` (
    `sia_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `sia_ipc` VARCHAR(100),
    `sia_ven` VARCHAR(100),
    `sia_fco` timestamp default current_timestamp,
    `sia_cos` VARCHAR(100),
    `sia_gar` VARCHAR(100)
);
CREATE TABLE `asignacion_servidores` (
    `ase_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `ase_ipc` VARCHAR(100),
    `ase_con` VARCHAR(100),
    `ase_did` VARCHAR(100),
    `ase_exp` VARCHAR(100),
    `ase_cco` VARCHAR(100),
    `ase_cpe` VARCHAR(100),
    `ase_are` VARCHAR(100),
    `ase_car` VARCHAR(100),
    `ase_pro` VARCHAR(100),
    `ase_ubi` VARCHAR(100),
    `ase_fas` timestamp default current_timestamp
);
CREATE TABLE `impresoras` (
    `imp_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `imp_est` VARCHAR(100),
    `imp_iim` VARCHAR(100),
    `imp_ser` VARCHAR(100),
    `imp_mar` VARCHAR(100),
    `imp_mod` VARCHAR(100)
);
CREATE TABLE `impresoras_informacion_administrativa` (
    `iia_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `iia_iim` VARCHAR(100),
    `iia_ven` VARCHAR(100),
    `iia_fco` timestamp default current_timestamp,
    `iia_cos` VARCHAR(100),
    `iia_gar` VARCHAR(100)
);
CREATE TABLE `asignacion_impresora` (
    `aim_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `aim_iim` VARCHAR(100),
    `aim_con` VARCHAR(100),
    `aim_did` VARCHAR(100),
    `aim_exp` VARCHAR(100),
    `aim_cco` VARCHAR(100),
    `aim_cpe` VARCHAR(100),
    `aim_are` VARCHAR(100),
    `aim_car` VARCHAR(100),
    `aim_pro` VARCHAR(100),
    `aim_ubi` VARCHAR(100),
    `aim_fas` timestamp default current_timestamp
);
CREATE TABLE `inventario_sw` (
    `isf_id` INT(100) NOT NULL auto_increment PRIMARY KEY,
    `isf_rco` VARCHAR(100),
    `isf_nom` VARCHAR(100),
    `isf_ver` VARCHAR(100),
    `isf_edi` VARCHAR(100),
    `isf_ipr` VARCHAR(100),
    `isf_pke` VARCHAR(100),
    `isf_ven` VARCHAR(100),
    `isf_fco` VARCHAR(100),
    `isf_est` VARCHAR(100),
    `isf_equ` VARCHAR(100)
);