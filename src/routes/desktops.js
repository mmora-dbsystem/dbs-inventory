//Instanciamos express...
const express = require('express');
const { route } = require('.');
//Instanciamos el modulo router de express...
const router = express.Router();
//Importamos la conexion de BD...
const pool = require('../database');
//Importamos el metodo autentications para asegurar las trutas...
const { isLoggedIn } = require('../lib/auth');


router.get('/', isLoggedIn, async (req, res) => {
    const desktopsHW = await pool.query('SELECT * FROM escritorio');
    res.render('desktops/list', { desktopsHW: desktopsHW });
});


router.get('/delete/:esc_id', isLoggedIn, async (req, res) => {
    const id = req.params.esc_id;
    await pool.query('DELETE FROM escritorio WHERE esc_id = ?', [id]);
    req.flash('DeleteSwSuccess', 'PC eliminado satisfactoriamente.');
    res.redirect('/desktops');
});


router.get('/info/:esc_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.esc_id_interno;
    const desktopsIHW = await pool.query('SELECT * FROM escritorio WHERE esc_id_interno = ?', [id]);
    res.render('desktops/info', {
        desktopsIHW: desktopsIHW[0],
    });
    req.flash('SearchSwSuccess', 'Esta es la informacion del PC.');
});


router.get('/add', isLoggedIn, (req, res) => {
    //Renderisamos la vista con el siguiente archivo HBS...
    res.render('desktops/add');
});


router.post('/add', isLoggedIn, async (req, res) => {
    const { esc_id, esc_id_interno, esc_info_estado, esc_info_serial, esc_info_marca, esc_info_modelo, esc_info_procesador_modelo,
        esc_info_procesador_velocidad, esc_info_procesador_arquitectura, esc_info_memoria_tamano, esc_info_memoria_referencia,
        esc_info_disco_tamano, esc_info_disco_referencia, esc_info_mac_ethernet, esc_info_mac_wifi, esc_info_observaciones, esc_info_ruta_imagen,
        esc_sw_sistema_operativo, esc_sw_version_so, esc_sw_edicion_so, esc_sw_product_id, esc_sw_product_key, esc_sw_ruta_info,
        esc_soporte_remoto_id, esc_soporte_remoto_clave, esc_adicional_mouse, esc_adicional_padmouse, esc_adicional_teclado, esc_adicional_base_refrigerante,
        esc_adicional_guaya, esc_adicional_clave_guaya, esc_adicional_pantalla, esc_adicional_adaptador_usb_eth, esc_adicional_observaciones_dispositivos,
        esc_administrativa_vendedor, esc_administrativa_fecha_compra, esc_administrativa_costo, esc_administrativa_garantia, esc_asignacion_consultor,
        esc_asignacion_documento_identidad, esc_asignacion_expedicion_documento, esc_asignacion_correo_corporativo, esc_asignacion_correo_personal,
        esc_asignacion_area, esc_asignacion_cargo, esc_asignacion_proyecto, esc_asignacion_ubicacion, esc_asignacion_fecha_asignacion, esc_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/desktops/' + esc_id_interno;
    const newDesktopHW = {
        esc_id_interno,
        esc_info_estado: 'Disponible',
        esc_info_serial,
        esc_info_marca,
        esc_info_modelo,
        esc_info_procesador_modelo,
        esc_info_procesador_velocidad,
        esc_info_procesador_arquitectura,
        esc_info_memoria_tamano,
        esc_info_memoria_referencia,
        esc_info_disco_tamano,
        esc_info_disco_referencia,
        esc_info_mac_ethernet,
        esc_info_mac_wifi,
        esc_info_observaciones,
        esc_info_ruta_imagen: imageURL,
        esc_sw_sistema_operativo,
        esc_sw_version_so,
        esc_sw_edicion_so,
        esc_sw_product_id,
        esc_sw_product_key,
        esc_sw_ruta_info,
        esc_soporte_remoto_id,
        esc_soporte_remoto_clave,
        esc_adicional_mouse,
        esc_adicional_padmouse,
        esc_adicional_teclado,
        esc_adicional_base_refrigerante,
        esc_adicional_guaya,
        esc_adicional_clave_guaya,
        esc_adicional_pantalla,
        esc_adicional_adaptador_usb_eth,
        esc_adicional_observaciones_dispositivos,
        esc_administrativa_vendedor,
        esc_administrativa_fecha_compra,
        esc_administrativa_costo,
        esc_administrativa_garantia,
        esc_asignacion_consultor,
        esc_asignacion_documento_identidad,
        esc_asignacion_expedicion_documento,
        esc_asignacion_correo_corporativo,
        esc_asignacion_correo_personal,
        esc_asignacion_area,
        esc_asignacion_cargo,
        esc_asignacion_proyecto,
        esc_asignacion_ubicacion,
        esc_asignacion_fecha_asignacion,
        esc_asignacion_observaciones
    };
    if (esc_id_interno == '' ||
        esc_info_serial == '' ||
        esc_info_marca == '' ||
        esc_info_modelo == '' ||
        esc_info_procesador_modelo == '' ||
        esc_info_procesador_velocidad == '' ||
        esc_info_procesador_arquitectura == '' ||
        esc_info_memoria_tamano == '' ||
        esc_info_memoria_referencia == '' ||
        esc_info_disco_tamano == '' ||
        esc_info_disco_referencia == '' ||
        esc_info_mac_ethernet == '' ||
        esc_info_mac_wifi == '' ||
        esc_info_observaciones == '' ||
        esc_sw_sistema_operativo == '' ||
        esc_sw_version_so == '' ||
        esc_sw_edicion_so == '' ||
        esc_sw_product_id == '' ||
        esc_sw_product_key == '' ||
        esc_sw_ruta_info == '' ||
        esc_soporte_remoto_id == '' ||
        esc_soporte_remoto_clave == '' ||
        esc_adicional_mouse == '' ||
        esc_adicional_padmouse == '' ||
        esc_adicional_teclado == '' ||
        esc_adicional_base_refrigerante == '' ||
        esc_adicional_guaya == '' ||
        esc_adicional_clave_guaya == '' ||
        esc_adicional_pantalla == '' ||
        esc_adicional_adaptador_usb_eth == '' ||
        esc_adicional_observaciones_dispositivos == '' ||
        esc_administrativa_vendedor == '' ||
        esc_administrativa_fecha_compra == '' ||
        esc_administrativa_costo == '' ||
        esc_administrativa_garantia == '' ||
        esc_asignacion_consultor == '' ||
        esc_asignacion_documento_identidad == '' ||
        esc_asignacion_expedicion_documento == '' ||
        esc_asignacion_correo_corporativo == '' ||
        esc_asignacion_correo_personal == '' ||
        esc_asignacion_area == '' ||
        esc_asignacion_cargo == '' ||
        esc_asignacion_proyecto == '' ||
        esc_asignacion_ubicacion == '' ||
        esc_asignacion_fecha_asignacion == '' ||
        esc_asignacion_observaciones == '') {
        res.redirect('/desktops/error');
    } else {
        await pool.query('INSERT INTO escritorio set ?', [newDesktopHW]);
        req.flash('AddSwSuccess', 'PC agregado satisfactoriamente.');
        res.redirect('/desktops');
    }
});


router.get('/edit/:esc_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.esc_id_interno;
    const escritoriolHW = await pool.query('SELECT * FROM escritorio WHERE esc_id_interno = ?', [id]);
    res.render('desktops/edit', {
        escritoriolHW: escritoriolHW[0]
    });
    req.flash('SearchSwSuccess', 'El PC se a actualizado satisfactoriamente.');
});


router.post('/edit/:esc_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.esc_id_interno;
    const { esc_id, esc_id_interno, esc_info_estado, esc_info_serial, esc_info_marca, esc_info_modelo, esc_info_procesador_modelo,
        esc_info_procesador_velocidad, esc_info_procesador_arquitectura, esc_info_memoria_tamano, esc_info_memoria_referencia,
        esc_info_disco_tamano, esc_info_disco_referencia, esc_info_mac_ethernet, esc_info_mac_wifi, esc_info_observaciones, esc_info_ruta_imagen,
        esc_sw_sistema_operativo, esc_sw_version_so, esc_sw_edicion_so, esc_sw_product_id, esc_sw_product_key, esc_sw_ruta_info,
        esc_soporte_remoto_id, esc_soporte_remoto_clave, esc_adicional_mouse, esc_adicional_padmouse, esc_adicional_teclado, esc_adicional_base_refrigerante,
        esc_adicional_guaya, esc_adicional_clave_guaya, esc_adicional_pantalla, esc_adicional_adaptador_usb_eth, esc_adicional_observaciones_dispositivos,
        esc_administrativa_vendedor, esc_administrativa_fecha_compra, esc_administrativa_costo, esc_administrativa_garantia, esc_asignacion_consultor,
        esc_asignacion_documento_identidad, esc_asignacion_expedicion_documento, esc_asignacion_correo_corporativo, esc_asignacion_correo_personal,
        esc_asignacion_area, esc_asignacion_cargo, esc_asignacion_proyecto, esc_asignacion_ubicacion, esc_asignacion_fecha_asignacion, esc_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/desktops/' + id;
    const infoAssign = await pool.query('SELECT * FROM escritorio WHERE esc_id_interno = ?', [id]);
    const editDesktopHW = {
        esc_id_interno: id,
        esc_info_estado,
        esc_info_serial,
        esc_info_marca,
        esc_info_modelo,
        esc_info_procesador_modelo,
        esc_info_procesador_velocidad,
        esc_info_procesador_arquitectura,
        esc_info_memoria_tamano,
        esc_info_memoria_referencia,
        esc_info_disco_tamano,
        esc_info_disco_referencia,
        esc_info_mac_ethernet,
        esc_info_mac_wifi,
        esc_info_observaciones,
        esc_info_ruta_imagen: imageURL,
        esc_sw_sistema_operativo,
        esc_sw_version_so,
        esc_sw_edicion_so,
        esc_sw_product_id,
        esc_sw_product_key,
        esc_sw_ruta_info,
        esc_soporte_remoto_id,
        esc_soporte_remoto_clave,
        esc_adicional_mouse,
        esc_adicional_padmouse,
        esc_adicional_teclado,
        esc_adicional_base_refrigerante,
        esc_adicional_guaya,
        esc_adicional_clave_guaya,
        esc_adicional_pantalla,
        esc_adicional_adaptador_usb_eth,
        esc_adicional_observaciones_dispositivos,
        esc_administrativa_vendedor,
        esc_administrativa_fecha_compra,
        esc_administrativa_costo,
        esc_administrativa_garantia,
        esc_asignacion_consultor: infoAssign[0].esc_asignacion_consultor,
        esc_asignacion_documento_identidad: infoAssign[0].esc_asignacion_documento_identidad,
        esc_asignacion_expedicion_documento: infoAssign[0].esc_asignacion_expedicion_documento,
        esc_asignacion_correo_corporativo: infoAssign[0].esc_asignacion_correo_corporativo,
        esc_asignacion_correo_personal: infoAssign[0].esc_asignacion_correo_personal,
        esc_asignacion_area: infoAssign[0].esc_asignacion_area,
        esc_asignacion_cargo: infoAssign[0].esc_asignacion_cargo,
        esc_asignacion_proyecto: infoAssign[0].esc_asignacion_proyecto,
        esc_asignacion_ubicacion: infoAssign[0].esc_asignacion_ubicacion,
        esc_asignacion_fecha_asignacion: infoAssign[0].esc_asignacion_fecha_asignacion,
        esc_asignacion_observaciones: infoAssign[0].esc_asignacion_observaciones
    };
    if (esc_id_interno == '' ||
        esc_info_serial == '' ||
        esc_info_marca == '' ||
        esc_info_modelo == '' ||
        esc_info_procesador_modelo == '' ||
        esc_info_procesador_velocidad == '' ||
        esc_info_procesador_arquitectura == '' ||
        esc_info_memoria_tamano == '' ||
        esc_info_memoria_referencia == '' ||
        esc_info_disco_tamano == '' ||
        esc_info_disco_referencia == '' ||
        esc_info_mac_ethernet == '' ||
        esc_info_mac_wifi == '' ||
        esc_sw_sistema_operativo == '' ||
        esc_sw_version_so == '' ||
        esc_sw_edicion_so == '' ||
        esc_sw_product_id == '' ||
        esc_sw_product_key == '' ||
        esc_sw_ruta_info == '' ||
        esc_soporte_remoto_id == '' ||
        esc_soporte_remoto_clave == '' ||
        esc_adicional_mouse == '' ||
        esc_adicional_padmouse == '' ||
        esc_adicional_teclado == '' ||
        esc_adicional_base_refrigerante == '' ||
        esc_adicional_guaya == '' ||
        esc_adicional_pantalla == '' ||
        esc_adicional_adaptador_usb_eth == '' ||
        esc_adicional_observaciones_dispositivos == '' ||
        esc_administrativa_vendedor == '' ||
        esc_administrativa_fecha_compra == '' ||
        esc_administrativa_costo == '' ||
        esc_administrativa_garantia == '' ||
        esc_asignacion_consultor == '' ||
        esc_asignacion_documento_identidad == '' ||
        esc_asignacion_expedicion_documento == '' ||
        esc_asignacion_correo_corporativo == '' ||
        esc_asignacion_correo_personal == '' ||
        esc_asignacion_area == '' ||
        esc_asignacion_cargo == '' ||
        esc_asignacion_proyecto == '' ||
        esc_asignacion_ubicacion == '' ||
        esc_asignacion_fecha_asignacion == '' ||
        esc_asignacion_observaciones == '') {
        res.redirect('/desktops/error');
    } else {
        await pool.query('UPDATE escritorio set ? WHERE esc_id_interno = ?', [editDesktopHW, id]);
        req.flash('UpdateSwSuccess', 'El PC se a actualizado satisfactoriamente.');
        res.redirect('/desktops');
    }
});


router.get('/assign/:esc_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.esc_id_interno;
    const validarAssign = await pool.query('SELECT esc_info_estado FROM escritorio WHERE esc_id_interno = ?', [id]);
    if (validarAssign[0].esc_info_estado == 'Asignado') {
        res.redirect('/desktops/unassigned/' + id);
    } else {
        const escritorioAssign = await pool.query('SELECT * FROM escritorio WHERE esc_id_interno = ?', [id]);
        res.render('desktops/assign', {
            escritorioAssign: escritorioAssign[0],
        });
    };
});


router.post('/assign/:esc_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.esc_id_interno;
    const { esc_id, esc_id_interno, esc_info_estado, esc_info_serial, esc_info_marca, esc_info_modelo, esc_info_procesador_modelo,
        esc_info_procesador_velocidad, esc_info_procesador_arquitectura, esc_info_memoria_tamano, esc_info_memoria_referencia,
        esc_info_disco_tamano, esc_info_disco_referencia, esc_info_mac_ethernet, esc_info_mac_wifi, esc_info_observaciones, esc_info_ruta_imagen,
        esc_sw_sistema_operativo, esc_sw_version_so, esc_sw_edicion_so, esc_sw_product_id, esc_sw_product_key, esc_sw_ruta_info,
        esc_soporte_remoto_id, esc_soporte_remoto_clave, esc_adicional_mouse, esc_adicional_padmouse, esc_adicional_teclado, esc_adicional_base_refrigerante,
        esc_adicional_guaya, esc_adicional_clave_guaya, esc_adicional_pantalla, esc_adicional_adaptador_usb_eth, esc_adicional_observaciones_dispositivos,
        esc_administrativa_vendedor, esc_administrativa_fecha_compra, esc_administrativa_costo, esc_administrativa_garantia, esc_asignacion_consultor,
        esc_asignacion_documento_identidad, esc_asignacion_expedicion_documento, esc_asignacion_correo_corporativo, esc_asignacion_correo_personal,
        esc_asignacion_area, esc_asignacion_cargo, esc_asignacion_proyecto, esc_asignacion_ubicacion, esc_asignacion_fecha_asignacion, esc_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/desktops/' + id;
    const assignDesktop = {
        esc_id_interno: id,
        esc_info_estado: 'Asignado',
        esc_asignacion_consultor,
        esc_asignacion_documento_identidad,
        esc_asignacion_expedicion_documento,
        esc_asignacion_correo_corporativo,
        esc_asignacion_correo_personal,
        esc_asignacion_area,
        esc_asignacion_cargo,
        esc_asignacion_proyecto,
        esc_asignacion_ubicacion,
        esc_asignacion_fecha_asignacion,
        esc_asignacion_observaciones,
        esc_adicional_mouse,
        esc_adicional_padmouse,
        esc_adicional_teclado,
        esc_adicional_base_refrigerante,
        esc_adicional_guaya,
        esc_adicional_clave_guaya,
        esc_adicional_pantalla,
        esc_adicional_adaptador_usb_eth,
        esc_adicional_observaciones_dispositivos
    };
    if (esc_id_interno == '' ||
        esc_info_estado == '' ||
        esc_asignacion_consultor == '' ||
        esc_asignacion_documento_identidad == '' ||
        esc_asignacion_expedicion_documento == '' ||
        esc_asignacion_correo_corporativo == '' ||
        esc_asignacion_correo_personal == '' ||
        esc_asignacion_area == '' ||
        esc_asignacion_cargo == '' ||
        esc_asignacion_proyecto == '' ||
        esc_asignacion_ubicacion == '' ||
        esc_asignacion_fecha_asignacion == '' ||
        esc_asignacion_observaciones == '' ||
        esc_adicional_mouse == '' ||
        esc_adicional_padmouse == '' ||
        esc_adicional_teclado == '' ||
        esc_adicional_base_refrigerante == '' ||
        esc_adicional_guaya == '' ||
        esc_adicional_pantalla == '' ||
        esc_adicional_adaptador_usb_eth == '' ||
        esc_adicional_observaciones_dispositivos == '') {
        res.redirect('/desktops/error');
    } else {
        await pool.query('UPDATE escritorio set esc_id_interno= ?,  esc_info_estado= ?,  esc_asignacion_consultor= ?, esc_asignacion_documento_identidad= ?, esc_asignacion_expedicion_documento= ?, esc_asignacion_correo_corporativo= ?, esc_asignacion_correo_personal= ?, esc_asignacion_area= ?, esc_asignacion_cargo= ?, esc_asignacion_proyecto= ?, esc_asignacion_ubicacion= ?, esc_asignacion_fecha_asignacion= ?, esc_asignacion_observaciones= ?, esc_adicional_mouse  = ?,esc_adicional_padmouse  = ?,esc_adicional_teclado  = ?,esc_adicional_base_refrigerante =?, esc_adicional_guaya  = ?,esc_adicional_clave_guaya  = ?,esc_adicional_pantalla  = ?,esc_adicional_adaptador_usb_eth  = ?,esc_adicional_observaciones_dispositivos  = ? WHERE esc_id_interno = ?',
            [assignDesktop.esc_id_interno, assignDesktop.esc_info_estado, assignDesktop.esc_asignacion_consultor, assignDesktop.esc_asignacion_documento_identidad, assignDesktop.esc_asignacion_expedicion_documento, assignDesktop.esc_asignacion_correo_corporativo, assignDesktop.esc_asignacion_correo_personal, assignDesktop.esc_asignacion_area, assignDesktop.esc_asignacion_cargo, assignDesktop.esc_asignacion_proyecto, assignDesktop.esc_asignacion_ubicacion, assignDesktop.esc_asignacion_fecha_asignacion, assignDesktop.esc_asignacion_observaciones, assignDesktop.esc_adicional_mouse, assignDesktop.esc_adicional_padmouse, assignDesktop.esc_adicional_teclado, assignDesktop.esc_adicional_base_refrigerante, assignDesktop.esc_adicional_guaya, assignDesktop.esc_adicional_clave_guaya, assignDesktop.esc_adicional_pantalla, assignDesktop.esc_adicional_adaptador_usb_eth, assignDesktop.esc_adicional_observaciones_dispositivos, id]);
        req.flash('AddSwSuccess', 'El PC se ha asignado correctamente.');
        res.redirect('/desktops');
    }
});


router.get('/unassigned/:esc_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.esc_id_interno;
    const unassignedHW = await pool.query('SELECT * FROM escritorio WHERE esc_id_interno = ?', [id]);
    res.render('desktops/unassigned', { unassignedHW: unassignedHW[0] });
});


router.post('/deallocate/:esc_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.esc_id_interno;
    const { esc_id, esc_id_interno, esc_info_estado, esc_info_serial, esc_info_marca, esc_info_modelo, esc_info_procesador_modelo,
        esc_info_procesador_velocidad, esc_info_procesador_arquitectura, esc_info_memoria_tamano, esc_info_memoria_referencia,
        esc_info_disco_tamano, esc_info_disco_referencia, esc_info_mac_ethernet, esc_info_mac_wifi, esc_info_observaciones, esc_info_ruta_imagen,
        esc_sw_sistema_operativo, esc_sw_version_so, esc_sw_edicion_so, esc_sw_product_id, esc_sw_product_key, esc_sw_ruta_info,
        esc_soporte_remoto_id, esc_soporte_remoto_clave, esc_adicional_mouse, esc_adicional_padmouse, esc_adicional_teclado, esc_adicional_base_refrigerante,
        esc_adicional_guaya, esc_adicional_clave_guaya, esc_adicional_pantalla, esc_adicional_adaptador_usb_eth, esc_adicional_observaciones_dispositivos,
        esc_administrativa_vendedor, esc_administrativa_fecha_compra, esc_administrativa_costo, esc_administrativa_garantia, esc_asignacion_consultor,
        esc_asignacion_documento_identidad, esc_asignacion_expedicion_documento, esc_asignacion_correo_corporativo, esc_asignacion_correo_personal,
        esc_asignacion_area, esc_asignacion_cargo, esc_asignacion_proyecto, esc_asignacion_ubicacion, esc_asignacion_fecha_asignacion, esc_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/desktops/' + id;
    const deallocatedesktop = {
        esc_id_interno: id,
        esc_info_estado: 'Disponible',
        esc_asignacion_consultor: '',
        esc_asignacion_documento_identidad: '',
        esc_asignacion_expedicion_documento: '',
        esc_asignacion_correo_corporativo: '',
        esc_asignacion_correo_personal: '',
        esc_asignacion_area: '',
        esc_asignacion_cargo: '',
        esc_asignacion_proyecto: '',
        esc_asignacion_ubicacion: '',
        esc_asignacion_fecha_asignacion: '',
        esc_asignacion_observaciones: '',
        esc_adicional_mouse: 'NO',
        esc_adicional_padmouse: 'NO',
        esc_adicional_teclado: 'NO',
        esc_adicional_base_refrigerante: 'NO',
        esc_adicional_guaya: 'NO',
        esc_adicional_clave_guaya: '',
        esc_adicional_pantalla: 'NO',
        esc_adicional_adaptador_usb_eth: 'NO',
        esc_adicional_observaciones_dispositivos: ''
    };
    await pool.query('UPDATE escritorio set esc_id_interno= ?,  esc_info_estado= ?,  esc_asignacion_consultor= ?, esc_asignacion_documento_identidad= ?, esc_asignacion_expedicion_documento= ?, esc_asignacion_correo_corporativo= ?, esc_asignacion_correo_personal= ?, esc_asignacion_area= ?, esc_asignacion_cargo= ?, esc_asignacion_proyecto= ?, esc_asignacion_ubicacion= ?, esc_asignacion_fecha_asignacion= ?, esc_asignacion_observaciones= ?, esc_adicional_mouse  = ?,esc_adicional_padmouse  = ?,esc_adicional_teclado  = ?,esc_adicional_base_refrigerante =?, esc_adicional_guaya  = ?,esc_adicional_clave_guaya  = ?,esc_adicional_pantalla  = ?,esc_adicional_adaptador_usb_eth  = ?,esc_adicional_observaciones_dispositivos  = ?  WHERE esc_id_interno = ?',
        [deallocatedesktop.esc_id_interno, deallocatedesktop.esc_info_estado, deallocatedesktop.esc_asignacion_consultor, deallocatedesktop.esc_asignacion_documento_identidad, deallocatedesktop.esc_asignacion_expedicion_documento, deallocatedesktop.esc_asignacion_correo_corporativo, deallocatedesktop.esc_asignacion_correo_personal, deallocatedesktop.esc_asignacion_area, deallocatedesktop.esc_asignacion_cargo, deallocatedesktop.esc_asignacion_proyecto, deallocatedesktop.esc_asignacion_ubicacion, deallocatedesktop.esc_asignacion_fecha_asignacion, deallocatedesktop.esc_asignacion_observaciones, deallocatedesktop.esc_adicional_mouse, deallocatedesktop.esc_adicional_padmouse, deallocatedesktop.esc_adicional_teclado, deallocatedesktop.esc_adicional_base_refrigerante, deallocatedesktop.esc_adicional_guaya, deallocatedesktop.esc_adicional_clave_guaya, deallocatedesktop.esc_adicional_pantalla, deallocatedesktop.esc_adicional_adaptador_usb_eth, deallocatedesktop.esc_adicional_observaciones_dispositivos, id]);
    req.flash('AddSwSuccess', 'El equipo se ha asignado correctamente.');
    res.redirect('/desktops');

});


router.get('/error', isLoggedIn, async (req, res) => {
    res.render('error');
});

//Exportamos router...
module.exports = router;