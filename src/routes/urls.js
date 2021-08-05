//Instanciamos express...
const express = require('express');
//Instanciamos el modulo router de express...
const router = express.Router();
//Importamos la conexion de BD...
const pool = require('../database');
//Importamos el metodo autentications para asegurar las trutas...
const { isLoggedIn } = require('../lib/auth');


//Creamos una ruta /add para las peticiones GET, "localhost:4000/urls/add"...
router.get('/add', isLoggedIn, (req, res) => {
    //Renderisamos la vista con el siguiente archivo HBS...
    res.render('urls/add');
});


//Creamos una ruta /add para la peticion POS...
router.post('/add', isLoggedIn, async (req, res) => {
    /*
    //Muestra por consola la informacion enviada...
    console.log(req.body);
    */
    //Asignamos los campos a guardar en la propiedad req.body...
    const { url_nombre, url_url, url_detalle, url_usuario, url_clave } = req.body;
    //Creamos un objeto para un nuevo programa...
    const newUrls = {
        url_nombre,
        url_url,
        url_detalle,
        url_usuario,
        url_clave
    };
    //Enviamos nuestra informacion a la BD...
    await pool.query('INSERT INTO urls_ti set ?', [newUrls]);
    /*
    ///Muestra por consola el nuevo objeto...
    console.log(newUrls);
    //Muestra una respuesta de recibido...
    res.send('Recibido.');
    */
    //Creamos un mensaje con flash-connect
    req.flash('AddSwSuccess', 'URL almacenada satisfactoriamente.');
    //Redireccionamos a la ruta de inicio...
    res.redirect('/urls');
});


//Creamos la ruta /softwares para la peticion GET...
router.get('/', isLoggedIn, async (req, res) => {
    //Creamos una constante software_base donde se almacenara el query ejecutado...
    const urls_ti = await pool.query('SELECT * FROM urls_ti');
    /*
    //Mostramos el resultado por consola...
    console.log(urls_ti);
    //Enviamos una respuesta...
    res.send('Aca se veran las URLS.')
    */
    //Renderisamos la vista con el siguiente archivo HBS, y enviamos los datos... 
    res.render('urls/list', { urls_ti: urls_ti });
});


//Creamos la ruta /delete para la peticion GET...
router.get('/delete/:url_id', isLoggedIn, async (req, res) => {
    /*
    //Mostramos el resultado por consola...
    console.log(req.params.url_id);
    //Enviamos una respuesta...
    res.send('Programa eliminado...');
    */
    //Creamos una variable que almacene el ID del SW a eliminar...
    const id = req.params.url_id;
    //Enviamos el query con el ID a eliminar...
    await pool.query('DELETE FROM urls_ti WHERE url_id = ?', [id]);
    //Creamos un mensaje con flash-connect
    req.flash('DeleteSwSuccess', 'URL eliminada satisfactoriamente.');
    //Redireccionamos a la pestaña de SW...
    res.redirect('/urls');
});


//Creamos la ruta /edit para la peticion GET
router.get('/edit/:url_id', isLoggedIn, async (req, res) => {
    /*
    //Mostramos el resultado por consola...
    const id = req.params.url_id;
    //Mostramos el resultado por consola...
    console.log(id);
    //Enviamos una respuesta... 
    res.send('URL editada...');
    */
    //Creamos una variable que almacene el ID del SW a eliminar...
    const id = req.params.url_id;
    //Enviamos el query con el ID a consultar...
    const urlsti = await pool.query('SELECT * FROM urls_ti WHERE url_id = ?', [id]);
    /*
    //Mostramos el resultado por consola...
    console.log(urlsti[0]);
    */
    //Renderisa en la ventana edit el contenido de software base
    res.render('urls/edit', { urlsti: urlsti[0] });
});


//Creamos la ruta /edit para la peticion POST
router.post('/edit/:url_id', isLoggedIn, async (req, res) => {
    //Creamos una constante para el ID que se recivira al momento de editar el programa...
    const id = req.params.url_id;
    //Asignamos los campos a guardar en la propiedad req.body...
    const { url_nombre, url_url, url_detalle, url_usuario, url_clave } = req.body;
    //Creamos un objeto para un nuevo programa...
    const editUrls = {
        url_nombre,
        url_url,
        url_detalle,
        url_usuario,
        url_clave
    };
    
    //Enviamos nuestra informacion a la BD...
    await pool.query('UPDATE urls_ti set ? WHERE url_id = ?', [editUrls, id]);
    //Creamos un mensaje con flash-connect
    req.flash('UpdateSwSuccess', 'URL actualizada satisfactoriamente.');
    //Redireccionamos a la ruta de inicio...
    res.redirect('/urls');
});


//Exportamos router...
module.exports = router;