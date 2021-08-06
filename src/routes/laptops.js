//Instanciamos express...
const express = require('express');
const { route } = require('.');
//Instanciamos el modulo router de express...
const router = express.Router();
//Importamos la conexion de BD...
const pool = require('../database');
//Importamos el metodo autentications para asegurar las trutas...
const { isLoggedIn } = require('../lib/auth');


//Creamos la ruta /laptops para la peticion GET...
router.get('/', isLoggedIn, async (req, res) => {
    //Creamos una constante software_base donde se almacenara el query ejecutado...
    const laptopsHW = await pool.query('SELECT * FROM portatiles');
    res.render('laptops/list', { laptopsHW: laptopsHW });
});


//Creamos la ruta /delete para la peticion GET...
router.get('/delete/:por_id', isLoggedIn, async (req, res) => {
    /*
    //Mostramos el resultado por consola...
    console.log(req.params.por_id);
    //Enviamos una respuesta...
    res.send('Laptop eliminado...');
    */
    //Creamos una variable que almacene el ID del SW a eliminar...
    const id = req.params.por_id;
    //Enviamos el query con el ID a eliminar...
    await pool.query('DELETE FROM portatiles WHERE por_id = ?', [id]);
    //Creamos un mensaje con flash-connect
    req.flash('DeleteSwSuccess', 'Laptop eliminada satisfactoriamente.');
    //Redireccionamos a la pestaña de SW...
    res.redirect('/laptops');
});


//Creamos la ruta /edit para la peticion GET
router.get('/info/:por_id_interno', isLoggedIn, async (req, res) => {
    /*
    //Mostramos el resultado por consola...
    const id = req.params.por_id_interno;
    //Mostramos el resultado por consola...
    console.log(id);
    //Enviamos una respuesta... 
    res.send('Laptop editado...');
    */
    //Creamos una variable que almacene el ID del laptop a editar...
    const id = req.params.por_id_interno;
    //Enviamos el query con el ID a consultar...
    const portatilIHW = await pool.query('SELECT * FROM portatiles WHERE por_id_interno = ?', [id]);
    /*
    //Mostramos el resultado por consola...
    console.log(portatilHW[0]);
    */
    //Renderisa en la ventana edit el contenido de software base
    res.render('laptops/info', {
        portatilIHW: portatilIHW[0],
    });
    //Creamos un mensaje con flash-connect
    req.flash('SearchSwSuccess', 'Esta es la informacion del portatil.');
});


//Creamos una ruta /add para las peticiones GET, "localhost:4000/laptop/add"...
router.get('/add', isLoggedIn, (req, res) => {
    //Renderisamos la vista con el siguiente archivo HBS...
    res.render('laptops/add');
});


//Creamos una ruta /add para la peticion POS...
router.post('/add', isLoggedIn, async (req, res) => {
    /*
    //Muestra por consola la informacion enviada...
    console.log(req.body);
    */
    //Asignamos los campos a guardar en la propiedad req.body...
    const { por_id, por_id_interno, por_info_estado, por_info_serial, por_info_marca, por_info_modelo, por_info_procesador_modelo,
        por_info_procesador_velocidad, por_info_procesador_arquitectura, por_info_memoria_tamano, por_info_memoria_referencia,
        por_info_disco_tamano, por_info_disco_referencia, por_info_mac_ethernet, por_info_mac_wifi, por_info_observaciones, por_info_ruta_imagen,
        por_sw_sistema_operativo, por_sw_version_so, por_sw_edicion_so, por_sw_product_id, por_sw_product_key, por_sw_ruta_info,
        por_soporte_remoto_id, por_soporte_remoto_clave, por_adicional_mouse, por_adicional_padmouse, por_adicional_teclado, por_adicional_base_refrigerante,
        por_adicional_guaya, por_adicional_clave_guaya, por_adicional_pantalla, por_adicional_adaptador_usb_eth, por_adicional_observaciones_dispositivos,
        por_administrativa_vendedor, por_administrativa_fecha_compra, por_administrativa_costo, por_administrativa_garantia, por_asignacion_consultor,
        por_asignacion_documento_identidad, por_asignacion_expedicion_documento, por_asignacion_correo_corporativo, por_asignacion_correo_personal,
        por_asignacion_area, por_asignacion_cargo, por_asignacion_proyecto, por_asignacion_ubicacion, por_asignacion_fecha_asignacion, por_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/laptops/' + por_id_interno;
    //Creamos un objeto para un nuevo programa...
    const newLaptopHW = {
        por_id_interno,
        por_info_estado: 'Disponible',
        por_info_serial,
        por_info_marca,
        por_info_modelo,
        por_info_procesador_modelo,
        por_info_procesador_velocidad,
        por_info_procesador_arquitectura,
        por_info_memoria_tamano,
        por_info_memoria_referencia,
        por_info_disco_tamano,
        por_info_disco_referencia,
        por_info_mac_ethernet,
        por_info_mac_wifi,
        por_info_observaciones,
        por_info_ruta_imagen: imageURL,
        por_sw_sistema_operativo,
        por_sw_version_so,
        por_sw_edicion_so,
        por_sw_product_id,
        por_sw_product_key,
        por_sw_ruta_info,
        por_soporte_remoto_id,
        por_soporte_remoto_clave,
        por_adicional_mouse,
        por_adicional_padmouse,
        por_adicional_teclado,
        por_adicional_base_refrigerante,
        por_adicional_guaya,
        por_adicional_clave_guaya,
        por_adicional_pantalla,
        por_adicional_adaptador_usb_eth,
        por_adicional_observaciones_dispositivos,
        por_administrativa_vendedor,
        por_administrativa_fecha_compra,
        por_administrativa_costo,
        por_administrativa_garantia,
        por_asignacion_consultor,
        por_asignacion_documento_identidad,
        por_asignacion_expedicion_documento,
        por_asignacion_correo_corporativo,
        por_asignacion_correo_personal,
        por_asignacion_area,
        por_asignacion_cargo,
        por_asignacion_proyecto,
        por_asignacion_ubicacion,
        por_asignacion_fecha_asignacion,
        por_asignacion_observaciones
    };
    if (por_id_interno == '' ||
        por_info_serial == '' ||
        por_info_marca == '' ||
        por_info_modelo == '' ||
        por_info_procesador_modelo == '' ||
        por_info_procesador_velocidad == '' ||
        por_info_procesador_arquitectura == '' ||
        por_info_memoria_tamano == '' ||
        por_info_memoria_referencia == '' ||
        por_info_disco_tamano == '' ||
        por_info_disco_referencia == '' ||
        por_info_mac_ethernet == '' ||
        por_info_mac_wifi == '' ||
        por_info_observaciones == '' ||
        por_sw_sistema_operativo == '' ||
        por_sw_version_so == '' ||
        por_sw_edicion_so == '' ||
        por_sw_product_id == '' ||
        por_sw_product_key == '' ||
        por_sw_ruta_info == '' ||
        por_soporte_remoto_id == '' ||
        por_soporte_remoto_clave == '' ||
        por_adicional_mouse == '' ||
        por_adicional_padmouse == '' ||
        por_adicional_teclado == '' ||
        por_adicional_base_refrigerante == '' ||
        por_adicional_guaya == '' ||
        por_adicional_clave_guaya == '' ||
        por_adicional_pantalla == '' ||
        por_adicional_adaptador_usb_eth == '' ||
        por_adicional_observaciones_dispositivos == '' ||
        por_administrativa_vendedor == '' ||
        por_administrativa_fecha_compra == '' ||
        por_administrativa_costo == '' ||
        por_administrativa_garantia == '' ||
        por_asignacion_consultor == '' ||
        por_asignacion_documento_identidad == '' ||
        por_asignacion_expedicion_documento == '' ||
        por_asignacion_correo_corporativo == '' ||
        por_asignacion_correo_personal == '' ||
        por_asignacion_area == '' ||
        por_asignacion_cargo == '' ||
        por_asignacion_proyecto == '' ||
        por_asignacion_ubicacion == '' ||
        por_asignacion_fecha_asignacion == '' ||
        por_asignacion_observaciones == '') {
        res.redirect('/laptops/error');
    } else {
        //Enviamos nuestra informacion a la BD...
        await pool.query('INSERT INTO portatiles set ?', [newLaptopHW]);
        /*
        ///Muestra por consola el nuevo objeto...
        console.log(newLaptopHW);
        //Muestra una respuesta de recibido...
        res.send('Recibido.');
        */
        //Creamos un mensaje con flash-connect
        req.flash('AddSwSuccess', 'Equipo portatil agregado satisfactoriamente.');
        //Redireccionamos a la ruta de inicio...
        res.redirect('/laptops');
    }
});


//Creamos la ruta /edit para la peticion GET
router.get('/edit/:por_id_interno', isLoggedIn, async (req, res) => {
    /*
    //Mostramos el resultado por consola...
    const id = req.params.por_id_interno;
    //Mostramos el resultado por consola...
    console.log(id);
    //Enviamos una respuesta... 
    res.send('Laptop editado...');
    */
    //Creamos una variable que almacene el ID del laptop a editar...
    const id = req.params.por_id_interno;
    //Enviamos el query con el ID a consultar...
    const portatilHW = await pool.query('SELECT * FROM portatiles WHERE por_id_interno = ?', [id]);
    /*
    //Mostramos el resultado por consola...
    console.log(portatilHW[0]);
    */
    //Renderisa en la ventana edit el contenido de software base
    res.render('laptops/edit', {
        portatilHW: portatilHW[0]
    });
    //Creamos un mensaje con flash-connect
    req.flash('SearchSwSuccess', 'El equipo portatil se a actualizado satisfactoriamente.');
});


//Creamos la ruta /edit para la peticion POST
router.post('/edit/:por_id_interno', isLoggedIn, async (req, res) => {
    //Creamos una constante para el ID que se recivira al momento de editar el programa...
    const id = req.params.por_id_interno;
    //Asignamos los campos a guardar en la propiedad req.body...
    const { por_id, por_id_interno, por_info_estado, por_info_serial, por_info_marca, por_info_modelo, por_info_procesador_modelo,
        por_info_procesador_velocidad, por_info_procesador_arquitectura, por_info_memoria_tamano, por_info_memoria_referencia,
        por_info_disco_tamano, por_info_disco_referencia, por_info_mac_ethernet, por_info_mac_wifi, por_info_observaciones, por_info_ruta_imagen,
        por_sw_sistema_operativo, por_sw_version_so, por_sw_edicion_so, por_sw_product_id, por_sw_product_key, por_sw_ruta_info,
        por_soporte_remoto_id, por_soporte_remoto_clave, por_adicional_mouse, por_adicional_padmouse, por_adicional_teclado, por_adicional_base_refrigerante,
        por_adicional_guaya, por_adicional_clave_guaya, por_adicional_pantalla, por_adicional_adaptador_usb_eth, por_adicional_observaciones_dispositivos,
        por_administrativa_vendedor, por_administrativa_fecha_compra, por_administrativa_costo, por_administrativa_garantia, por_asignacion_consultor,
        por_asignacion_documento_identidad, por_asignacion_expedicion_documento, por_asignacion_correo_corporativo, por_asignacion_correo_personal,
        por_asignacion_area, por_asignacion_cargo, por_asignacion_proyecto, por_asignacion_ubicacion, por_asignacion_fecha_asignacion, por_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/laptops/' + id;
    const infoAssign = await pool.query('SELECT * FROM portatiles WHERE por_id_interno = ?', [id]);
    //Creamos un objeto para un nuevo programa...
    const editLaptopHW = {
        por_id_interno: id,
        por_info_estado,
        por_info_serial,
        por_info_marca,
        por_info_modelo,
        por_info_procesador_modelo,
        por_info_procesador_velocidad,
        por_info_procesador_arquitectura,
        por_info_memoria_tamano,
        por_info_memoria_referencia,
        por_info_disco_tamano,
        por_info_disco_referencia,
        por_info_mac_ethernet,
        por_info_mac_wifi,
        por_info_observaciones,
        por_info_ruta_imagen: imageURL,
        por_sw_sistema_operativo,
        por_sw_version_so,
        por_sw_edicion_so,
        por_sw_product_id,
        por_sw_product_key,
        por_sw_ruta_info,
        por_soporte_remoto_id,
        por_soporte_remoto_clave,
        por_adicional_mouse,
        por_adicional_padmouse,
        por_adicional_teclado,
        por_adicional_base_refrigerante,
        por_adicional_guaya,
        por_adicional_clave_guaya,
        por_adicional_pantalla,
        por_adicional_adaptador_usb_eth,
        por_adicional_observaciones_dispositivos,
        por_administrativa_vendedor,
        por_administrativa_fecha_compra,
        por_administrativa_costo,
        por_administrativa_garantia,
        por_asignacion_consultor: infoAssign[0].por_asignacion_consultor,
        por_asignacion_documento_identidad: infoAssign[0].por_asignacion_documento_identidad,
        por_asignacion_expedicion_documento: infoAssign[0].por_asignacion_expedicion_documento,
        por_asignacion_correo_corporativo: infoAssign[0].por_asignacion_correo_corporativo,
        por_asignacion_correo_personal: infoAssign[0].por_asignacion_correo_personal,
        por_asignacion_area: infoAssign[0].por_asignacion_area,
        por_asignacion_cargo: infoAssign[0].por_asignacion_cargo,
        por_asignacion_proyecto: infoAssign[0].por_asignacion_proyecto,
        por_asignacion_ubicacion: infoAssign[0].por_asignacion_ubicacion,
        por_asignacion_fecha_asignacion: infoAssign[0].por_asignacion_fecha_asignacion,
        por_asignacion_observaciones: infoAssign[0].por_asignacion_observaciones
    };
    if (por_id_interno == '' ||
        por_info_serial == '' ||
        por_info_marca == '' ||
        por_info_modelo == '' ||
        por_info_procesador_modelo == '' ||
        por_info_procesador_velocidad == '' ||
        por_info_procesador_arquitectura == '' ||
        por_info_memoria_tamano == '' ||
        por_info_memoria_referencia == '' ||
        por_info_disco_tamano == '' ||
        por_info_disco_referencia == '' ||
        por_info_mac_ethernet == '' ||
        por_info_mac_wifi == '' ||
        por_sw_sistema_operativo == '' ||
        por_sw_version_so == '' ||
        por_sw_edicion_so == '' ||
        por_sw_product_id == '' ||
        por_sw_product_key == '' ||
        por_sw_ruta_info == '' ||
        por_soporte_remoto_id == '' ||
        por_soporte_remoto_clave == '' ||
        por_adicional_mouse == '' ||
        por_adicional_padmouse == '' ||
        por_adicional_teclado == '' ||
        por_adicional_base_refrigerante == '' ||
        por_adicional_guaya == '' ||
        por_adicional_pantalla == '' ||
        por_adicional_adaptador_usb_eth == '' ||
        por_adicional_observaciones_dispositivos == '' ||
        por_administrativa_vendedor == '' ||
        por_administrativa_fecha_compra == '' ||
        por_administrativa_costo == '' ||
        por_administrativa_garantia == '' ||
        por_asignacion_consultor == '' ||
        por_asignacion_documento_identidad == '' ||
        por_asignacion_expedicion_documento == '' ||
        por_asignacion_correo_corporativo == '' ||
        por_asignacion_correo_personal == '' ||
        por_asignacion_area == '' ||
        por_asignacion_cargo == '' ||
        por_asignacion_proyecto == '' ||
        por_asignacion_ubicacion == '' ||
        por_asignacion_fecha_asignacion == '' ||
        por_asignacion_observaciones == '') {
        res.redirect('/laptops/error');
    } else {
        /*
            //Muestra por consola...
            console.log(editLaptopHW);
            console.log(id);
            res.send("Actualizado");
             */
        //Enviamos nuestra informacion a la BD...
        await pool.query('UPDATE portatiles set ? WHERE por_id_interno = ?', [editLaptopHW, id]);
        //Creamos un mensaje con flash-connect
        req.flash('UpdateSwSuccess', 'El equipo portatil se a actualizado satisfactoriamente.');
        //Redireccionamos a la ruta de inicio...
        res.redirect('/laptops');
    }
});


router.get('/assign/:por_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.por_id_interno;
    const validarAssign = await pool.query('SELECT por_info_estado FROM portatiles WHERE por_id_interno = ?', [id]);
    console.log(validarAssign[0].por_info_estado);
    if (validarAssign[0].por_info_estado == 'Asignado') {
        res.redirect('/laptops/unassigned/' + id);
    } else {
        const portatilAssign = await pool.query('SELECT * FROM portatiles WHERE por_id_interno = ?', [id]);
        res.render('laptops/assign', {
            portatilAssign: portatilAssign[0],
        });
    };
});


router.post('/assign/:por_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.por_id_interno;
    const { por_id, por_id_interno, por_info_estado, por_info_serial, por_info_marca, por_info_modelo, por_info_procesador_modelo,
        por_info_procesador_velocidad, por_info_procesador_arquitectura, por_info_memoria_tamano, por_info_memoria_referencia,
        por_info_disco_tamano, por_info_disco_referencia, por_info_mac_ethernet, por_info_mac_wifi, por_info_observaciones, por_info_ruta_imagen,
        por_sw_sistema_operativo, por_sw_version_so, por_sw_edicion_so, por_sw_product_id, por_sw_product_key, por_sw_ruta_info,
        por_soporte_remoto_id, por_soporte_remoto_clave, por_adicional_mouse, por_adicional_padmouse, por_adicional_teclado, por_adicional_base_refrigerante,
        por_adicional_guaya, por_adicional_clave_guaya, por_adicional_pantalla, por_adicional_adaptador_usb_eth, por_adicional_observaciones_dispositivos,
        por_administrativa_vendedor, por_administrativa_fecha_compra, por_administrativa_costo, por_administrativa_garantia, por_asignacion_consultor,
        por_asignacion_documento_identidad, por_asignacion_expedicion_documento, por_asignacion_correo_corporativo, por_asignacion_correo_personal,
        por_asignacion_area, por_asignacion_cargo, por_asignacion_proyecto, por_asignacion_ubicacion, por_asignacion_fecha_asignacion, por_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/laptops/' + id;
    const assignLaptop = {
        por_id_interno: id,
        por_info_estado: 'Asignado',
        por_asignacion_consultor,
        por_asignacion_documento_identidad,
        por_asignacion_expedicion_documento,
        por_asignacion_correo_corporativo,
        por_asignacion_correo_personal,
        por_asignacion_area,
        por_asignacion_cargo,
        por_asignacion_proyecto,
        por_asignacion_ubicacion,
        por_asignacion_fecha_asignacion,
        por_asignacion_observaciones,
        por_adicional_mouse,
        por_adicional_padmouse,
        por_adicional_teclado,
        por_adicional_base_refrigerante,
        por_adicional_guaya,
        por_adicional_clave_guaya,
        por_adicional_pantalla,
        por_adicional_adaptador_usb_eth,
        por_adicional_observaciones_dispositivos
    };
    if (por_id_interno == '' ||
        por_info_estado == '' ||
        por_asignacion_consultor == '' ||
        por_asignacion_documento_identidad == '' ||
        por_asignacion_expedicion_documento == '' ||
        por_asignacion_correo_corporativo == '' ||
        por_asignacion_correo_personal == '' ||
        por_asignacion_area == '' ||
        por_asignacion_cargo == '' ||
        por_asignacion_proyecto == '' ||
        por_asignacion_ubicacion == '' ||
        por_asignacion_fecha_asignacion == '' ||
        por_asignacion_observaciones == '' ||
        por_adicional_mouse == '' ||
        por_adicional_padmouse == '' ||
        por_adicional_teclado == '' ||
        por_adicional_base_refrigerante == '' ||
        por_adicional_guaya == '' ||
        por_adicional_pantalla == '' ||
        por_adicional_adaptador_usb_eth == '' ||
        por_adicional_observaciones_dispositivos == '') {
        res.redirect('/laptops/error');
    } else {
        //Enviamos nuestra informacion a la BD...
        await pool.query('UPDATE portatiles set por_id_interno= ?,  por_info_estado= ?,  por_asignacion_consultor= ?, por_asignacion_documento_identidad= ?, por_asignacion_expedicion_documento= ?, por_asignacion_correo_corporativo= ?, por_asignacion_correo_personal= ?, por_asignacion_area= ?, por_asignacion_cargo= ?, por_asignacion_proyecto= ?, por_asignacion_ubicacion= ?, por_asignacion_fecha_asignacion= ?, por_asignacion_observaciones= ?, por_adicional_mouse  = ?,por_adicional_padmouse  = ?,por_adicional_teclado  = ?,por_adicional_base_refrigerante =?, por_adicional_guaya  = ?,por_adicional_clave_guaya  = ?,por_adicional_pantalla  = ?,por_adicional_adaptador_usb_eth  = ?,por_adicional_observaciones_dispositivos  = ? WHERE por_id_interno = ?',
            [assignLaptop.por_id_interno, assignLaptop.por_info_estado, assignLaptop.por_asignacion_consultor, assignLaptop.por_asignacion_documento_identidad, assignLaptop.por_asignacion_expedicion_documento, assignLaptop.por_asignacion_correo_corporativo, assignLaptop.por_asignacion_correo_personal, assignLaptop.por_asignacion_area, assignLaptop.por_asignacion_cargo, assignLaptop.por_asignacion_proyecto, assignLaptop.por_asignacion_ubicacion, assignLaptop.por_asignacion_fecha_asignacion, assignLaptop.por_asignacion_observaciones, assignLaptop.por_adicional_mouse, assignLaptop.por_adicional_padmouse, assignLaptop.por_adicional_teclado, assignLaptop.por_adicional_base_refrigerante, assignLaptop.por_adicional_guaya, assignLaptop.por_adicional_clave_guaya, assignLaptop.por_adicional_pantalla, assignLaptop.por_adicional_adaptador_usb_eth, assignLaptop.por_adicional_observaciones_dispositivos, id]);
        req.flash('AddSwSuccess', 'El equipo se ha asignado correctamente.');
        //Redireccionamos a la ruta de inicio...
        res.redirect('/laptops');
    }
});


router.get('/unassigned/:por_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.por_id_interno;
    //Enviamos el query con el ID a consultar...
    const unassignedHW = await pool.query('SELECT * FROM portatiles WHERE por_id_interno = ?', [id]);
    res.render('laptops/unassigned', { unassignedHW: unassignedHW[0] });
});


router.post('/deallocate/:por_id_interno', isLoggedIn, async (req, res) => {
    const id = req.params.por_id_interno;
    const { por_id, por_id_interno, por_info_estado, por_info_serial, por_info_marca, por_info_modelo, por_info_procesador_modelo,
        por_info_procesador_velocidad, por_info_procesador_arquitectura, por_info_memoria_tamano, por_info_memoria_referencia,
        por_info_disco_tamano, por_info_disco_referencia, por_info_mac_ethernet, por_info_mac_wifi, por_info_observaciones, por_info_ruta_imagen,
        por_sw_sistema_operativo, por_sw_version_so, por_sw_edicion_so, por_sw_product_id, por_sw_product_key, por_sw_ruta_info,
        por_soporte_remoto_id, por_soporte_remoto_clave, por_adicional_mouse, por_adicional_padmouse, por_adicional_teclado, por_adicional_base_refrigerante,
        por_adicional_guaya, por_adicional_clave_guaya, por_adicional_pantalla, por_adicional_adaptador_usb_eth, por_adicional_observaciones_dispositivos,
        por_administrativa_vendedor, por_administrativa_fecha_compra, por_administrativa_costo, por_administrativa_garantia, por_asignacion_consultor,
        por_asignacion_documento_identidad, por_asignacion_expedicion_documento, por_asignacion_correo_corporativo, por_asignacion_correo_personal,
        por_asignacion_area, por_asignacion_cargo, por_asignacion_proyecto, por_asignacion_ubicacion, por_asignacion_fecha_asignacion, por_asignacion_observaciones } = req.body;
    const imageURL = 'http://localhost/repo_dbs_inventory/laptops/' + id;
    const deallocateLaptop = {
        por_id_interno: id,
        por_info_estado: 'Disponible',
        por_asignacion_consultor: '',
        por_asignacion_documento_identidad: '',
        por_asignacion_expedicion_documento: '',
        por_asignacion_correo_corporativo: '',
        por_asignacion_correo_personal: '',
        por_asignacion_area: '',
        por_asignacion_cargo: '',
        por_asignacion_proyecto: '',
        por_asignacion_ubicacion: '',
        por_asignacion_fecha_asignacion: '',
        por_asignacion_observaciones: '',
        por_adicional_mouse: 'NO',
        por_adicional_padmouse: 'NO',
        por_adicional_teclado: 'NO',
        por_adicional_base_refrigerante: 'NO',
        por_adicional_guaya: 'NO',
        por_adicional_clave_guaya: '',
        por_adicional_pantalla: 'NO',
        por_adicional_adaptador_usb_eth: 'NO',
        por_adicional_observaciones_dispositivos: ''
    };
    //Enviamos nuestra informacion a la BD...
    await pool.query('UPDATE portatiles set por_id_interno= ?,  por_info_estado= ?,  por_asignacion_consultor= ?, por_asignacion_documento_identidad= ?, por_asignacion_expedicion_documento= ?, por_asignacion_correo_corporativo= ?, por_asignacion_correo_personal= ?, por_asignacion_area= ?, por_asignacion_cargo= ?, por_asignacion_proyecto= ?, por_asignacion_ubicacion= ?, por_asignacion_fecha_asignacion= ?, por_asignacion_observaciones= ?, por_adicional_mouse  = ?,por_adicional_padmouse  = ?,por_adicional_teclado  = ?,por_adicional_base_refrigerante =?, por_adicional_guaya  = ?,por_adicional_clave_guaya  = ?,por_adicional_pantalla  = ?,por_adicional_adaptador_usb_eth  = ?,por_adicional_observaciones_dispositivos  = ?  WHERE por_id_interno = ?',
        [deallocateLaptop.por_id_interno, deallocateLaptop.por_info_estado, deallocateLaptop.por_asignacion_consultor, deallocateLaptop.por_asignacion_documento_identidad, deallocateLaptop.por_asignacion_expedicion_documento, deallocateLaptop.por_asignacion_correo_corporativo, deallocateLaptop.por_asignacion_correo_personal, deallocateLaptop.por_asignacion_area, deallocateLaptop.por_asignacion_cargo, deallocateLaptop.por_asignacion_proyecto, deallocateLaptop.por_asignacion_ubicacion, deallocateLaptop.por_asignacion_fecha_asignacion, deallocateLaptop.por_asignacion_observaciones, deallocateLaptop.por_adicional_mouse, deallocateLaptop.por_adicional_padmouse, deallocateLaptop.por_adicional_teclado, deallocateLaptop.por_adicional_base_refrigerante, deallocateLaptop.por_adicional_guaya, deallocateLaptop.por_adicional_clave_guaya, deallocateLaptop.por_adicional_pantalla, deallocateLaptop.por_adicional_adaptador_usb_eth, deallocateLaptop.por_adicional_observaciones_dispositivos, id]);
    req.flash('AddSwSuccess', 'El equipo se ha asignado correctamente.');
    //Redireccionamos a la ruta de inicio...
    res.redirect('/laptops');

});

router.get('/error', isLoggedIn, async (req, res) => {
    res.render('error');
});


//Exportamos router...
module.exports = router;