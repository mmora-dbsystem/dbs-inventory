//Instanciamos express...
const express = require('express');
//Instanciamos el modulo router de express...
const router = express.Router();
//Importamos la conexion de BD...
const pool = require('../database');
//Importamos el metodo autentications para asegurar las trutas...
const { isLoggedIn } = require('../lib/auth');


//Creamos una ruta /add para las peticiones GET, "localhost:4000/softwares/add"...
router.get('/add', isLoggedIn, (req, res) => {
    //Renderisamos la vista con el siguiente archivo HBS...
    res.render('softwares/add');
});


//Creamos una ruta /add para la peticion POS...
router.post('/add', isLoggedIn, async (req, res) => {
    /*
    //Muestra por consola la informacion enviada...
    console.log(req.body);
    */
    //Asignamos los campos a guardar en la propiedad req.body...
    const { swb_nombre, swb_version, swb_detalle, swb_imagen, swb_descarga } = req.body;
    //Creamos un objeto para un nuevo programa...
    const newSoftware = {
        swb_nombre,
        swb_version,
        swb_detalle,
        swb_imagen,
        swb_descarga,
    };
    //Enviamos nuestra informacion a la BD...
    await pool.query('INSERT INTO software_base set ?', [newSoftware]);
    /*
    ///Muestra por consola el nuevo objeto...
    console.log(newSoftware);
    //Muestra una respuesta de recibido...
    res.send('Recibido.');
    */
    //Creamos un mensaje con flash-connect
    req.flash('AddSwSuccess', 'Programa almacenado satisfactoriamente.');
    //Redireccionamos a la ruta de inicio...
    res.redirect('/softwares');
});


//Creamos la ruta /softwares para la peticion GET...
router.get('/', isLoggedIn, async (req, res) => {
    //Creamos una constante software_base donde se almacenara el query ejecutado...
    const software_base = await pool.query('SELECT * FROM software_base');
    /*
    //Mostramos el resultado por consola...
    console.log(software_base);
    //Enviamos una respuesta...
    res.send('Aca se veran los software base.')
    */
    //Renderisamos la vista con el siguiente archivo HBS, y enviamos los datos... 
    res.render('softwares/list', { software_base: software_base });
});


//Creamos la ruta /delete para la peticion GET...
router.get('/delete/:swb_id', isLoggedIn, async (req, res) => {
    /*
    //Mostramos el resultado por consola...
    console.log(req.params.swb_id);
    //Enviamos una respuesta...
    res.send('Programa eliminado...');
    */
    //Creamos una variable que almacene el ID del SW a eliminar...
    const id = req.params.swb_id;
    //Enviamos el query con el ID a eliminar...
    await pool.query('DELETE FROM software_base WHERE swb_id = ?', [id]);
    //Creamos un mensaje con flash-connect
    req.flash('DeleteSwSuccess', 'Software base eliminado satisfactoriamente.');
    //Redireccionamos a la pestaña de SW...
    res.redirect('/softwares');
});


//Creamos la ruta /edit para la peticion GET
router.get('/edit/:swb_id', isLoggedIn, async (req, res) => {
    /*
    //Mostramos el resultado por consola...
    const id = req.params.swb_id;
    //Mostramos el resultado por consola...
    console.log(id);
    //Enviamos una respuesta... 
    res.send('Programa editado...');
    */
    //Creamos una variable que almacene el ID del SW a eliminar...
    const id = req.params.swb_id;
    //Enviamos el query con el ID a consultar...
    const sof_base = await pool.query('SELECT * FROM software_base WHERE swb_id = ?', [id]);
    /*
    //Mostramos el resultado por consola...
    console.log(sof_base[0]);
    */
    //Renderisa en la ventana edit el contenido de software base
    res.render('softwares/edit', { sof_base: sof_base[0] });
    //Creamos un mensaje con flash-connect
    req.flash('SearchSwSuccess', 'Programa encontrado satisfactoriamente.');
});


//Creamos la ruta /edit para la peticion POST
router.post('/edit/:swb_id', isLoggedIn, async (req, res) => {
    //Creamos una constante para el ID que se recivira al momento de editar el programa...
    const id = req.params.swb_id;
    //Asignamos los campos a guardar en la propiedad req.body...
    const { swb_nombre, swb_version, swb_detalle, swb_imagen, swb_descarga } = req.body;
    //Creamos un objeto para un nuevo programa...
    const editSoftware = {
        swb_nombre,
        swb_version,
        swb_detalle,
        swb_imagen,
        swb_descarga,
    };
    /*
    //Muestra por consola...
    console.log(editSoftware);
    console.log(id);
    res.send("Actualizado");
     */
    //Enviamos nuestra informacion a la BD...
    await pool.query('UPDATE software_base set ? WHERE swb_id = ?', [editSoftware, id]);
    //Creamos un mensaje con flash-connect
    req.flash('UpdateSwSuccess', 'Programa actualizado satisfactoriamente.');
    //Redireccionamos a la ruta de inicio...
    res.redirect('/softwares');
});

//Exportamos router...
module.exports = router;