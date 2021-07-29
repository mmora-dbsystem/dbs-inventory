//Instanciamos express...
const express = require('express');
//Instanciamos el modulo router de express...
const router = express.Router();
//Importamos la conexion de BD...
const pool = require('../database');
//Importamos el metodo autentications para asegurar las trutas...
const { isLoggedIn } = require('../lib/auth');


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
    const { phw_est, phw_ipt, phw_ser, phw_hma, phw_hmo, phw_hmp, phw_hvp, phw_hap, phw_hmt, phw_hmr, phw_hdt, phw_hdr, phw_hme, phw_hmw, phw_obs, phw_img, psw_ipt, psw_son, psw_sov, psw_soe, psw_soi, psw_sok, psw_ibi} = req.body;
    //Creamos un objeto para un nuevo programa...
    const newLaptopHW = {
        phw_est: 'Disponible', 
        phw_ipt, 
        phw_ser, 
        phw_hma, 
        phw_hmo, 
        phw_hmp, 
        phw_hvp, 
        phw_hap, 
        phw_hmt, 
        phw_hmr, 
        phw_hdt, 
        phw_hdr, 
        phw_hme, 
        phw_hmw, 
        phw_obs, 
        phw_img
    };
    const newLaptopSW = {
        psw_ipt: phw_ipt, 
        psw_son, 
        psw_sov, 
        psw_soe, 
        psw_soi, 
        psw_sok, 
        psw_ibi
    };
    //Enviamos nuestra informacion a la BD...
    await pool.query('INSERT INTO portatiles_hardware set ?', [newLaptopHW]);
    await pool.query('INSERT INTO portatiles_software set ?', [newLaptopSW]);
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
});


//Creamos la ruta /laptops para la peticion GET...
router.get('/', isLoggedIn, async (req, res) => {
    //Creamos una constante software_base donde se almacenara el query ejecutado...
    const laptopsHW = await pool.query('SELECT * FROM portatiles_hardware');
    /*
    //Mostramos el resultado por consola...
    console.log(laptopsHW);
    //Enviamos una respuesta...
    res.send('Aca se veran las laptops.')
    */
    //Renderisamos la vista con el siguiente archivo HBS, y enviamos los datos... 
    res.render('laptops/list', { laptopsHW: laptopsHW });
});


//Creamos la ruta /delete para la peticion GET...
router.get('/delete/:phw_id', isLoggedIn, async (req, res) => {
    /*
    //Mostramos el resultado por consola...
    console.log(req.params.phw_id);
    //Enviamos una respuesta...
    res.send('Laptop eliminado...');
    */
    //Creamos una variable que almacene el ID del SW a eliminar...
    const id = req.params.phw_id;
    //Enviamos el query con el ID a eliminar...
    await pool.query('DELETE FROM portatiles_hardware WHERE phw_id = ?', [id]);
    //Creamos un mensaje con flash-connect
    req.flash('DeleteSwSuccess', 'Laptop eliminada satisfactoriamente.');
    //Redireccionamos a la pestaña de SW...
    res.redirect('/laptops');
});


//Creamos la ruta /edit para la peticion GET
router.get('/edit/:phw_ipt', isLoggedIn, async (req, res) => {
    /*
    //Mostramos el resultado por consola...
    const id = req.params.phw_id;
    //Mostramos el resultado por consola...
    console.log(id);
    //Enviamos una respuesta... 
    res.send('Laptop editado...');
    */
    //Creamos una variable que almacene el ID del laptop a editar...
    const id = req.params.phw_ipt;
    //Enviamos el query con el ID a consultar...
    const portatil = await pool.query('SELECT * FROM portatiles_hardware WHERE phw_ipt = ?', [id]);
    /*
    //Mostramos el resultado por consola...
    console.log(portatil[0]);
    */
    //Renderisa en la ventana edit el contenido de software base
    res.render('laptops/edit', { portatil: portatil[0] });
    //Creamos un mensaje con flash-connect
    req.flash('SearchSwSuccess', 'El equipo portatil se a actualizado satisfactoriamente.');
    
});


//Creamos la ruta /edit para la peticion POST
router.post('/edit/:phw_ipt', isLoggedIn, async (req, res) => {
    //Creamos una constante para el ID que se recivira al momento de editar el programa...
    const id = req.params.phw_ipt;
    //Asignamos los campos a guardar en la propiedad req.body...
    const { phw_est, phw_ipt, phw_ser, phw_hma, phw_hmo, phw_hmp, phw_hvp, phw_hap, phw_hmt, phw_hmr, phw_hdt, phw_hdr, phw_hme, phw_hmw, phw_obs, phw_img } = req.body;
    //Creamos un objeto para un nuevo programa...
    const editLaptop = {
        phw_est,
        phw_ipt:id,
        phw_ser, 
        phw_hma, 
        phw_hmo, 
        phw_hmp, 
        phw_hvp, 
        phw_hap, 
        phw_hmt, 
        phw_hmr, 
        phw_hdt, 
        phw_hdr, 
        phw_hme, 
        phw_hmw, 
        phw_obs, 
        phw_img
    };
    console.log(editLaptop);
    /*
    //Muestra por consola...
    console.log(editLaptop);
    console.log(id);
    res.send("Actualizado");
     */
    //Enviamos nuestra informacion a la BD...
    await pool.query('UPDATE portatiles_hardware set ? WHERE phw_ipt = ?', [editLaptop, id]);
    //Creamos un mensaje con flash-connect
    req.flash('UpdateSwSuccess', 'El equipo portatil se a actualizado satisfactoriamente.');
    //Redireccionamos a la ruta de inicio...
    res.redirect('/laptops');
});

/*
//Creamos la ruta get para laptop...
router.get('/laptop/:phw_id', isLoggedIn, async (req, res) => {
    //Creamos la constante ID para pasar el ID del portatil...
    const id = req.body.phw_id;
    //Creamos un arreglo para almacenar la informacion del portatil...
    const info_laptop = await pool.query('SELECT * FROM portatiles_hardware WHERE phw_id = ?', [id] );
    console.log(id);
    console.log(info_laptop);
    //Renderisamos la informacion del portatil...
    res.render('laptops/laptop');
    //Enviamos mensaje de equipo encontrado...
    req.flash('Esta es la informacion del equipo: ' + id + '.');
});
*/

//Exportamos router...
module.exports = router;