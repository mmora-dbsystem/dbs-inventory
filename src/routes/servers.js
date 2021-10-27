const express = require('express');
const { route } = require('.');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/', isLoggedIn, async (req, res) => {
    const serversHW = await pool.query('SELECT * FROM servidores');
    res.render('servers/list', { serversHW: serversHW });
});


router.get('/delete/:ser_id', isLoggedIn, async (req, res) => {
    const id = req.params.ser_id;
    await pool.query('DELETE FROM servidores WHERE ser_id = ?', [id]);
    req.flash('DeleteSwSuccess', 'Servidor eliminado satisfactoriamente.');
    res.redirect('/servers');
});


router.get('/info/:ser_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.ser_id_interno;
    const serversIHW = await pool.query('SELECT * FROM servidores WHERE ser_id_interno = ?', [id]);
    res.render('servers/info', {
        serversIHW: serversIHW[0],
    });
    req.flash('SearchSwSuccess', 'Esta es la informacion del servidor.');
});


router.get('/add', isLoggedIn, (req, res) => {
    res.render('servers/add');
});


router.post('/add', isLoggedIn, async (req, res) => {
    const { ser_id, ser_id_interno, ser_info_estado, ser_info_serial, ser_info_marca, ser_info_modelo, ser_info_procesador_modelo,
        ser_info_procesador_velocidad, ser_info_procesador_arquitectura, ser_info_memoria_tamano, ser_info_memoria_referencia,
        ser_info_disco_tamano, ser_info_disco_referencia, ser_info_mac_ethernet, ser_info_mac_wifi, ser_info_observaciones, ser_info_ruta_imagen,
        ser_sw_sistema_operativo, ser_sw_version_so, ser_sw_edicion_so, ser_sw_product_id, ser_sw_product_key, ser_sw_ruta_info,
        ser_soporte_remoto_id, ser_soporte_remoto_clave, ser_adicional_mouse, ser_adicional_padmouse, ser_adicional_teclado, ser_adicional_base_refrigerante,
        ser_adicional_guaya, ser_adicional_clave_guaya, ser_adicional_pantalla, ser_adicional_adaptador_usb_eth, ser_adicional_observaciones_dispositivos,
        ser_administrativa_vendedor, ser_administrativa_fecha_compra, ser_administrativa_costo, ser_administrativa_garantia, ser_asignacion_consultor,
        ser_asignacion_documento_identidad, ser_asignacion_expedicion_documento, ser_asignacion_correo_corporativo, ser_asignacion_correo_personal,
        ser_asignacion_area, ser_asignacion_cargo, ser_asignacion_proyecto, ser_asignacion_ubicacion, ser_asignacion_fecha_asignacion, ser_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/servers/' + ser_id_interno;
    const newServerHW = {
        ser_id_interno,
        ser_info_estado: 'Disponible',
        ser_info_serial,
        ser_info_marca,
        ser_info_modelo,
        ser_info_procesador_modelo,
        ser_info_procesador_velocidad,
        ser_info_procesador_arquitectura,
        ser_info_memoria_tamano,
        ser_info_memoria_referencia,
        ser_info_disco_tamano,
        ser_info_disco_referencia,
        ser_info_mac_ethernet,
        ser_info_mac_wifi,
        ser_info_observaciones,
        ser_info_ruta_imagen: imageURL,
        ser_sw_sistema_operativo,
        ser_sw_version_so,
        ser_sw_edicion_so,
        ser_sw_product_id,
        ser_sw_product_key,
        ser_sw_ruta_info,
        ser_soporte_remoto_id,
        ser_soporte_remoto_clave,
        ser_adicional_mouse,
        ser_adicional_padmouse,
        ser_adicional_teclado,
        ser_adicional_base_refrigerante,
        ser_adicional_guaya,
        ser_adicional_clave_guaya,
        ser_adicional_pantalla,
        ser_adicional_adaptador_usb_eth,
        ser_adicional_observaciones_dispositivos,
        ser_administrativa_vendedor,
        ser_administrativa_fecha_compra,
        ser_administrativa_costo,
        ser_administrativa_garantia,
        ser_asignacion_consultor,
        ser_asignacion_documento_identidad,
        ser_asignacion_expedicion_documento,
        ser_asignacion_correo_corporativo,
        ser_asignacion_correo_personal,
        ser_asignacion_area,
        ser_asignacion_cargo,
        ser_asignacion_proyecto,
        ser_asignacion_ubicacion,
        ser_asignacion_fecha_asignacion,
        ser_asignacion_observaciones
    };
    if (ser_id_interno == '' ||
        ser_info_serial == '' ||
        ser_info_marca == '' ||
        ser_info_modelo == '' ||
        ser_info_procesador_modelo == '' ||
        ser_info_procesador_velocidad == '' ||
        ser_info_procesador_arquitectura == '' ||
        ser_info_memoria_tamano == '' ||
        ser_info_memoria_referencia == '' ||
        ser_info_disco_tamano == '' ||
        ser_info_disco_referencia == '' ||
        ser_info_mac_ethernet == '' ||
        ser_info_mac_wifi == '' ||
        ser_info_observaciones == '' ||
        ser_sw_sistema_operativo == '' ||
        ser_sw_version_so == '' ||
        ser_sw_edicion_so == '' ||
        ser_sw_product_id == '' ||
        ser_sw_product_key == '' ||
        ser_sw_ruta_info == '' ||
        ser_soporte_remoto_id == '' ||
        ser_soporte_remoto_clave == '' ||
        ser_adicional_mouse == '' ||
        ser_adicional_padmouse == '' ||
        ser_adicional_teclado == '' ||
        ser_adicional_base_refrigerante == '' ||
        ser_adicional_guaya == '' ||
        ser_adicional_clave_guaya == '' ||
        ser_adicional_pantalla == '' ||
        ser_adicional_adaptador_usb_eth == '' ||
        ser_adicional_observaciones_dispositivos == '' ||
        ser_administrativa_vendedor == '' ||
        ser_administrativa_fecha_compra == '' ||
        ser_administrativa_costo == '' ||
        ser_administrativa_garantia == '' ||
        ser_asignacion_consultor == '' ||
        ser_asignacion_documento_identidad == '' ||
        ser_asignacion_expedicion_documento == '' ||
        ser_asignacion_correo_corporativo == '' ||
        ser_asignacion_correo_personal == '' ||
        ser_asignacion_area == '' ||
        ser_asignacion_cargo == '' ||
        ser_asignacion_proyecto == '' ||
        ser_asignacion_ubicacion == '' ||
        ser_asignacion_fecha_asignacion == '' ||
        ser_asignacion_observaciones == '') {
        res.redirect('/servers/error');
    } else {
        await pool.query('INSERT INTO servidores set ?', [newServerHW]);
        req.flash('AddSwSuccess', 'Servidor agregado satisfactoriamente.');
        res.redirect('/servers');
    }
});


router.get('/edit/:ser_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.ser_id_interno;
    const servidoreslHW = await pool.query('SELECT * FROM servidores WHERE ser_id_interno = ?', [id]);
    res.render('servers/edit', {
        servidoreslHW: servidoreslHW[0]
    });
    req.flash('SearchSwSuccess', 'El servidor se a actualizado satisfactoriamente.');
});


router.post('/edit/:ser_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.ser_id_interno;
    const { ser_id, ser_id_interno, ser_info_estado, ser_info_serial, ser_info_marca, ser_info_modelo, ser_info_procesador_modelo,
        ser_info_procesador_velocidad, ser_info_procesador_arquitectura, ser_info_memoria_tamano, ser_info_memoria_referencia,
        ser_info_disco_tamano, ser_info_disco_referencia, ser_info_mac_ethernet, ser_info_mac_wifi, ser_info_observaciones, ser_info_ruta_imagen,
        ser_sw_sistema_operativo, ser_sw_version_so, ser_sw_edicion_so, ser_sw_product_id, ser_sw_product_key, ser_sw_ruta_info,
        ser_soporte_remoto_id, ser_soporte_remoto_clave, ser_adicional_mouse, ser_adicional_padmouse, ser_adicional_teclado, ser_adicional_base_refrigerante,
        ser_adicional_guaya, ser_adicional_clave_guaya, ser_adicional_pantalla, ser_adicional_adaptador_usb_eth, ser_adicional_observaciones_dispositivos,
        ser_administrativa_vendedor, ser_administrativa_fecha_compra, ser_administrativa_costo, ser_administrativa_garantia, ser_asignacion_consultor,
        ser_asignacion_documento_identidad, ser_asignacion_expedicion_documento, ser_asignacion_correo_corporativo, ser_asignacion_correo_personal,
        ser_asignacion_area, ser_asignacion_cargo, ser_asignacion_proyecto, ser_asignacion_ubicacion, ser_asignacion_fecha_asignacion, ser_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/servers/' + id;
    const infoAssign = await pool.query('SELECT * FROM servidores WHERE ser_id_interno = ?', [id]);
    const editServerHW = {
        ser_id_interno: id,
        ser_info_estado,
        ser_info_serial,
        ser_info_marca,
        ser_info_modelo,
        ser_info_procesador_modelo,
        ser_info_procesador_velocidad,
        ser_info_procesador_arquitectura,
        ser_info_memoria_tamano,
        ser_info_memoria_referencia,
        ser_info_disco_tamano,
        ser_info_disco_referencia,
        ser_info_mac_ethernet,
        ser_info_mac_wifi,
        ser_info_observaciones,
        ser_info_ruta_imagen: imageURL,
        ser_sw_sistema_operativo,
        ser_sw_version_so,
        ser_sw_edicion_so,
        ser_sw_product_id,
        ser_sw_product_key,
        ser_sw_ruta_info,
        ser_soporte_remoto_id,
        ser_soporte_remoto_clave,
        ser_adicional_mouse,
        ser_adicional_padmouse,
        ser_adicional_teclado,
        ser_adicional_base_refrigerante,
        ser_adicional_guaya,
        ser_adicional_clave_guaya,
        ser_adicional_pantalla,
        ser_adicional_adaptador_usb_eth,
        ser_adicional_observaciones_dispositivos,
        ser_administrativa_vendedor,
        ser_administrativa_fecha_compra,
        ser_administrativa_costo,
        ser_administrativa_garantia,
        ser_asignacion_consultor: infoAssign[0].ser_asignacion_consultor,
        ser_asignacion_documento_identidad: infoAssign[0].ser_asignacion_documento_identidad,
        ser_asignacion_expedicion_documento: infoAssign[0].ser_asignacion_expedicion_documento,
        ser_asignacion_correo_corporativo: infoAssign[0].ser_asignacion_correo_corporativo,
        ser_asignacion_correo_personal: infoAssign[0].ser_asignacion_correo_personal,
        ser_asignacion_area: infoAssign[0].ser_asignacion_area,
        ser_asignacion_cargo: infoAssign[0].ser_asignacion_cargo,
        ser_asignacion_proyecto: infoAssign[0].ser_asignacion_proyecto,
        ser_asignacion_ubicacion: infoAssign[0].ser_asignacion_ubicacion,
        ser_asignacion_fecha_asignacion: infoAssign[0].ser_asignacion_fecha_asignacion,
        ser_asignacion_observaciones: infoAssign[0].ser_asignacion_observaciones
    };
    if (ser_id_interno == '' ||
        ser_info_serial == '' ||
        ser_info_marca == '' ||
        ser_info_modelo == '' ||
        ser_info_procesador_modelo == '' ||
        ser_info_procesador_velocidad == '' ||
        ser_info_procesador_arquitectura == '' ||
        ser_info_memoria_tamano == '' ||
        ser_info_memoria_referencia == '' ||
        ser_info_disco_tamano == '' ||
        ser_info_disco_referencia == '' ||
        ser_info_mac_ethernet == '' ||
        ser_info_mac_wifi == '' ||
        ser_sw_sistema_operativo == '' ||
        ser_sw_version_so == '' ||
        ser_sw_edicion_so == '' ||
        ser_sw_product_id == '' ||
        ser_sw_product_key == '' ||
        ser_sw_ruta_info == '' ||
        ser_soporte_remoto_id == '' ||
        ser_soporte_remoto_clave == '' ||
        ser_adicional_mouse == '' ||
        ser_adicional_padmouse == '' ||
        ser_adicional_teclado == '' ||
        ser_adicional_base_refrigerante == '' ||
        ser_adicional_guaya == '' ||
        ser_adicional_pantalla == '' ||
        ser_adicional_adaptador_usb_eth == '' ||
        ser_adicional_observaciones_dispositivos == '' ||
        ser_administrativa_vendedor == '' ||
        ser_administrativa_fecha_compra == '' ||
        ser_administrativa_costo == '' ||
        ser_administrativa_garantia == '' ||
        ser_asignacion_consultor == '' ||
        ser_asignacion_documento_identidad == '' ||
        ser_asignacion_expedicion_documento == '' ||
        ser_asignacion_correo_corporativo == '' ||
        ser_asignacion_correo_personal == '' ||
        ser_asignacion_area == '' ||
        ser_asignacion_cargo == '' ||
        ser_asignacion_proyecto == '' ||
        ser_asignacion_ubicacion == '' ||
        ser_asignacion_fecha_asignacion == '' ||
        ser_asignacion_observaciones == '') {
        res.redirect('/servers/error');
    } else {
        await pool.query('UPDATE servidores set ? WHERE ser_id_interno = ?', [editServerHW, id]);
        req.flash('UpdateSwSuccess', 'El servidor se a actualizado satisfactoriamente.');
        res.redirect('/servers');
    }
});


router.get('/assign/:ser_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.ser_id_interno;
    const validarAssign = await pool.query('SELECT ser_info_estado FROM servidores WHERE ser_id_interno = ?', [id]);
    if (validarAssign[0].ser_info_estado == 'Asignado') {
        res.redirect('/servers/unassigned/' + id);
    } else {
        const servidoresAssign = await pool.query('SELECT * FROM servidores WHERE ser_id_interno = ?', [id]);
        res.render('servers/assign', {
            servidoresAssign: servidoresAssign[0],
        });
    };
});


router.post('/assign/:ser_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.ser_id_interno;
    const { ser_id, ser_id_interno, ser_info_estado, ser_info_serial, ser_info_marca, ser_info_modelo, ser_info_procesador_modelo,
        ser_info_procesador_velocidad, ser_info_procesador_arquitectura, ser_info_memoria_tamano, ser_info_memoria_referencia,
        ser_info_disco_tamano, ser_info_disco_referencia, ser_info_mac_ethernet, ser_info_mac_wifi, ser_info_observaciones, ser_info_ruta_imagen,
        ser_sw_sistema_operativo, ser_sw_version_so, ser_sw_edicion_so, ser_sw_product_id, ser_sw_product_key, ser_sw_ruta_info,
        ser_soporte_remoto_id, ser_soporte_remoto_clave, ser_adicional_mouse, ser_adicional_padmouse, ser_adicional_teclado, ser_adicional_base_refrigerante,
        ser_adicional_guaya, ser_adicional_clave_guaya, ser_adicional_pantalla, ser_adicional_adaptador_usb_eth, ser_adicional_observaciones_dispositivos,
        ser_administrativa_vendedor, ser_administrativa_fecha_compra, ser_administrativa_costo, ser_administrativa_garantia, ser_asignacion_consultor,
        ser_asignacion_documento_identidad, ser_asignacion_expedicion_documento, ser_asignacion_correo_corporativo, ser_asignacion_correo_personal,
        ser_asignacion_area, ser_asignacion_cargo, ser_asignacion_proyecto, ser_asignacion_ubicacion, ser_asignacion_fecha_asignacion, ser_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/servers/' + id;
    const assignServer = {
        ser_id_interno: id,
        ser_info_estado: 'Asignado',
        ser_asignacion_consultor,
        ser_asignacion_documento_identidad,
        ser_asignacion_expedicion_documento,
        ser_asignacion_correo_corporativo,
        ser_asignacion_correo_personal,
        ser_asignacion_area,
        ser_asignacion_cargo,
        ser_asignacion_proyecto,
        ser_asignacion_ubicacion,
        ser_asignacion_fecha_asignacion,
        ser_asignacion_observaciones,
        ser_adicional_mouse,
        ser_adicional_padmouse,
        ser_adicional_teclado,
        ser_adicional_base_refrigerante,
        ser_adicional_guaya,
        ser_adicional_clave_guaya,
        ser_adicional_pantalla,
        ser_adicional_adaptador_usb_eth,
        ser_adicional_observaciones_dispositivos
    };
    if (ser_id_interno == '' ||
        ser_info_estado == '' ||
        ser_asignacion_consultor == '' ||
        ser_asignacion_documento_identidad == '' ||
        ser_asignacion_expedicion_documento == '' ||
        ser_asignacion_correo_corporativo == '' ||
        ser_asignacion_correo_personal == '' ||
        ser_asignacion_area == '' ||
        ser_asignacion_cargo == '' ||
        ser_asignacion_proyecto == '' ||
        ser_asignacion_ubicacion == '' ||
        ser_asignacion_fecha_asignacion == '' ||
        ser_asignacion_observaciones == '' ||
        ser_adicional_mouse == '' ||
        ser_adicional_padmouse == '' ||
        ser_adicional_teclado == '' ||
        ser_adicional_base_refrigerante == '' ||
        ser_adicional_guaya == '' ||
        ser_adicional_pantalla == '' ||
        ser_adicional_adaptador_usb_eth == '' ||
        ser_adicional_observaciones_dispositivos == '') {
        res.redirect('/servers/error');
    } else {
        await pool.query('UPDATE servidores set ser_id_interno= ?,  ser_info_estado= ?,  ser_asignacion_consultor= ?, ser_asignacion_documento_identidad= ?, ser_asignacion_expedicion_documento= ?, ser_asignacion_correo_corporativo= ?, ser_asignacion_correo_personal= ?, ser_asignacion_area= ?, ser_asignacion_cargo= ?, ser_asignacion_proyecto= ?, ser_asignacion_ubicacion= ?, ser_asignacion_fecha_asignacion= ?, ser_asignacion_observaciones= ?, ser_adicional_mouse  = ?,ser_adicional_padmouse  = ?,ser_adicional_teclado  = ?,ser_adicional_base_refrigerante =?, ser_adicional_guaya  = ?,ser_adicional_clave_guaya  = ?,ser_adicional_pantalla  = ?,ser_adicional_adaptador_usb_eth  = ?,ser_adicional_observaciones_dispositivos  = ? WHERE ser_id_interno = ?',
            [assignServer.ser_id_interno, assignServer.ser_info_estado, assignServer.ser_asignacion_consultor, assignServer.ser_asignacion_documento_identidad, assignServer.ser_asignacion_expedicion_documento, assignServer.ser_asignacion_correo_corporativo, assignServer.ser_asignacion_correo_personal, assignServer.ser_asignacion_area, assignServer.ser_asignacion_cargo, assignServer.ser_asignacion_proyecto, assignServer.ser_asignacion_ubicacion, assignServer.ser_asignacion_fecha_asignacion, assignServer.ser_asignacion_observaciones, assignServer.ser_adicional_mouse, assignServer.ser_adicional_padmouse, assignServer.ser_adicional_teclado, assignServer.ser_adicional_base_refrigerante, assignServer.ser_adicional_guaya, assignServer.ser_adicional_clave_guaya, assignServer.ser_adicional_pantalla, assignServer.ser_adicional_adaptador_usb_eth, assignServer.ser_adicional_observaciones_dispositivos, id]);
        req.flash('AddSwSuccess', 'El servidor se ha asignado correctamente.');
        res.redirect('/servers');
    }
});


router.get('/unassigned/:ser_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.ser_id_interno;
    const unassignedHW = await pool.query('SELECT * FROM servidores WHERE ser_id_interno = ?', [id]);
    res.render('servers/unassigned', { unassignedHW: unassignedHW[0] });
});


router.post('/deallocate/:ser_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.ser_id_interno;
    const { ser_id, ser_id_interno, ser_info_estado, ser_info_serial, ser_info_marca, ser_info_modelo, ser_info_procesador_modelo,
        ser_info_procesador_velocidad, ser_info_procesador_arquitectura, ser_info_memoria_tamano, ser_info_memoria_referencia,
        ser_info_disco_tamano, ser_info_disco_referencia, ser_info_mac_ethernet, ser_info_mac_wifi, ser_info_observaciones, ser_info_ruta_imagen,
        ser_sw_sistema_operativo, ser_sw_version_so, ser_sw_edicion_so, ser_sw_product_id, ser_sw_product_key, ser_sw_ruta_info,
        ser_soporte_remoto_id, ser_soporte_remoto_clave, ser_adicional_mouse, ser_adicional_padmouse, ser_adicional_teclado, ser_adicional_base_refrigerante,
        ser_adicional_guaya, ser_adicional_clave_guaya, ser_adicional_pantalla, ser_adicional_adaptador_usb_eth, ser_adicional_observaciones_dispositivos,
        ser_administrativa_vendedor, ser_administrativa_fecha_compra, ser_administrativa_costo, ser_administrativa_garantia, ser_asignacion_consultor,
        ser_asignacion_documento_identidad, ser_asignacion_expedicion_documento, ser_asignacion_correo_corporativo, ser_asignacion_correo_personal,
        ser_asignacion_area, ser_asignacion_cargo, ser_asignacion_proyecto, ser_asignacion_ubicacion, ser_asignacion_fecha_asignacion, ser_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/servers/' + id;
    const deallocateServer = {
        ser_id_interno: id,
        ser_info_estado: 'Disponible',
        ser_asignacion_consultor: '',
        ser_asignacion_documento_identidad: '',
        ser_asignacion_expedicion_documento: '',
        ser_asignacion_correo_corporativo: '',
        ser_asignacion_correo_personal: '',
        ser_asignacion_area: '',
        ser_asignacion_cargo: '',
        ser_asignacion_proyecto: '',
        ser_asignacion_ubicacion: '',
        ser_asignacion_fecha_asignacion: '',
        ser_asignacion_observaciones: '',
        ser_adicional_mouse: 'NO',
        ser_adicional_padmouse: 'NO',
        ser_adicional_teclado: 'NO',
        ser_adicional_base_refrigerante: 'NO',
        ser_adicional_guaya: 'NO',
        ser_adicional_clave_guaya: '',
        ser_adicional_pantalla: 'NO',
        ser_adicional_adaptador_usb_eth: 'NO',
        ser_adicional_observaciones_dispositivos: ''
    };
    await pool.query('UPDATE servidores set ser_id_interno= ?,  ser_info_estado= ?,  ser_asignacion_consultor= ?, ser_asignacion_documento_identidad= ?, ser_asignacion_expedicion_documento= ?, ser_asignacion_correo_corporativo= ?, ser_asignacion_correo_personal= ?, ser_asignacion_area= ?, ser_asignacion_cargo= ?, ser_asignacion_proyecto= ?, ser_asignacion_ubicacion= ?, ser_asignacion_fecha_asignacion= ?, ser_asignacion_observaciones= ?, ser_adicional_mouse  = ?,ser_adicional_padmouse  = ?,ser_adicional_teclado  = ?,ser_adicional_base_refrigerante =?, ser_adicional_guaya  = ?,ser_adicional_clave_guaya  = ?,ser_adicional_pantalla  = ?,ser_adicional_adaptador_usb_eth  = ?,ser_adicional_observaciones_dispositivos  = ?  WHERE ser_id_interno = ?',
        [deallocateServer.ser_id_interno, deallocateServer.ser_info_estado, deallocateServer.ser_asignacion_consultor, deallocateServer.ser_asignacion_documento_identidad, deallocateServer.ser_asignacion_expedicion_documento, deallocateServer.ser_asignacion_correo_corporativo, deallocateServer.ser_asignacion_correo_personal, deallocateServer.ser_asignacion_area, deallocateServer.ser_asignacion_cargo, deallocateServer.ser_asignacion_proyecto, deallocateServer.ser_asignacion_ubicacion, deallocateServer.ser_asignacion_fecha_asignacion, deallocateServer.ser_asignacion_observaciones, deallocateServer.ser_adicional_mouse, deallocateServer.ser_adicional_padmouse, deallocateServer.ser_adicional_teclado, deallocateServer.ser_adicional_base_refrigerante, deallocateServer.ser_adicional_guaya, deallocateServer.ser_adicional_clave_guaya, deallocateServer.ser_adicional_pantalla, deallocateServer.ser_adicional_adaptador_usb_eth, deallocateServer.ser_adicional_observaciones_dispositivos, id]);
    req.flash('AddSwSuccess', 'El equipo se ha asignado correctamente.');
    res.redirect('/servers');

});


router.get('/error', isLoggedIn, async (req, res) => {
    res.render('error');
});

//Exportamos router...
module.exports = router;