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
    const { phw_est, phw_ipt, phw_ser, phw_hma, phw_hmo, phw_hmp, phw_hvp, phw_hap, phw_hmt, phw_hmr, phw_hdt, phw_hdr, phw_hme, phw_hmw, phw_obs, phw_img,
        pda_ipt, pda_mou, pda_pmo, pda_tec, pda_bas, pda_gua, pda_cgu, pda_pan, pda_uet, pda_obs,
        psw_ipt, psw_son, psw_sov, psw_soe, psw_soi, psw_sok, psw_ibi,
        psr_ipt, psr_ida, psr_cla,
        pia_ipt, pia_ven, pia_fco, pia_cos, pia_gar } = req.body;
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
    const newAdicionalesLaptop = {
        pda_ipt: phw_ipt,
        pda_mou,
        pda_pmo,
        pda_tec,
        pda_bas,
        pda_gua,
        pda_cgu,
        pda_pan,
        pda_uet,
        pda_obs
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
    const newRemotoLaptop = {
        psr_ipt: phw_ipt,
        psr_ida,
        psr_cla
    };
    const newAdministrativaLaptop = {
        pia_ipt: phw_ipt,
        pia_ven, 
        pia_fco, 
        pia_cos, 
        pia_gar
    };
    //Enviamos nuestra informacion a la BD...
    await pool.query('INSERT INTO portatiles_hardware set ?', [newLaptopHW]);
    await pool.query('INSERT INTO portatiles_dispositivos_adicionales set ?', [newAdicionalesLaptop]);
    await pool.query('INSERT INTO portatiles_software set ?', [newLaptopSW]);
    await pool.query('INSERT INTO portatiles_soporte_remoto set ?', [newRemotoLaptop]);
    await pool.query('INSERT INTO portatiles_informacion_administrativa set ?', [newAdministrativaLaptop]);
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
    //Enviamos el query con el ID a eliminar...
    await pool.query('DELETE FROM portatiles_dispositivos_adicionales WHERE pda_id = ?', [id]);
    //Enviamos el query con el ID a eliminar...
    await pool.query('DELETE FROM portatiles_software WHERE psw_id = ?', [id]);
    //Enviamos el query con el ID a eliminar...
    await pool.query('DELETE FROM portatiles_soporte_remoto WHERE psr_id = ?', [id]);
    //Enviamos el query con el ID a eliminar...
    await pool.query('DELETE FROM portatiles_informacion_administrativa WHERE pia_id = ?', [id]);
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
    const portatilHW = await pool.query('SELECT * FROM portatiles_hardware WHERE phw_ipt = ?', [id]);
    //Enviamos el query con el ID a consultar...
    const portatilDA = await pool.query('SELECT * FROM portatiles_dispositivos_adicionales WHERE pda_ipt = ?', [id]);
    //Enviamos el query con el ID a consultar...
    const portatilSW = await pool.query('SELECT * FROM portatiles_software WHERE psw_ipt = ?', [id]);
    //Enviamos el query con el ID a consultar...
    const portatilSR = await pool.query('SELECT * FROM portatiles_soporte_remoto WHERE psr_ipt = ?', [id]);
    //Enviamos el query con el ID a consultar...
    const portatilIA = await pool.query('SELECT * FROM portatiles_informacion_administrativa WHERE pia_ipt = ?', [id]);
    /*
    //Mostramos el resultado por consola...
    console.log(portatilHW[0]);
    */
    //Renderisa en la ventana edit el contenido de software base
    res.render('laptops/edit', { 
        portatilHW: portatilHW[0], 
        portatilSW: portatilSW[0], 
        portatilDA: portatilDA[0], 
        portatilSR: portatilSR[0],
        portatilIA: portatilIA[0] 
    });
    //Creamos un mensaje con flash-connect
    req.flash('SearchSwSuccess', 'El equipo portatil se a actualizado satisfactoriamente.');
});


//Creamos la ruta /edit para la peticion POST
router.post('/edit/:phw_ipt', isLoggedIn, async (req, res) => {
    //Creamos una constante para el ID que se recivira al momento de editar el programa...
    const id = req.params.phw_ipt;
    //Asignamos los campos a guardar en la propiedad req.body...
    const { phw_est, phw_ipt, phw_ser, phw_hma, phw_hmo, phw_hmp, phw_hvp, phw_hap, phw_hmt, phw_hmr, phw_hdt, phw_hdr, phw_hme, phw_hmw, phw_obs, phw_img,
        pda_ipt, pda_mou, pda_pmo, pda_tec, pda_bas, pda_gua, pda_cgu, pda_pan, pda_uet, pda_obs,
        psw_ipt, psw_son, psw_sov, psw_soe, psw_soi, psw_sok, psw_ibi,
        psr_ipt, psr_ida, psr_cla,
        pia_ipt, pia_ven, pia_fco, pia_cos, pia_gar } = req.body;
    //Creamos un objeto para un nuevo programa...
    const editLaptopHW = {
        phw_est,
        phw_ipt: id,
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
    const editAdicionales = {
        pda_ipt: id,
        pda_mou,
        pda_pmo,
        pda_tec,
        pda_bas,
        pda_gua,
        pda_cgu,
        pda_pan,
        pda_uet,
        pda_obs
    };
    const editLaptopSW = {
        psw_ipt: id,
        psw_son,
        psw_sov,
        psw_soe,
        psw_soi,
        psw_sok,
        psw_ibi
    };
    const editRemotoLaptop = {
        psr_ipt: id,
        psr_ida,
        psr_cla
    };
    const editAdministrativaLaptop = {
        pia_ipt: id,
        pia_ven, 
        pia_fco, 
        pia_cos, 
        pia_gar
    };
    /*
    //Muestra por consola...
    console.log(editLaptopHW);
    console.log(id);
    res.send("Actualizado");
     */
    //Enviamos nuestra informacion a la BD...
    await pool.query('UPDATE portatiles_hardware set ? WHERE phw_ipt = ?', [editLaptopHW, id]);
    //Enviamos nuestra informacion a la BD...
    await pool.query('UPDATE portatiles_dispositivos_adicionales set ? WHERE pda_ipt = ?', [editAdicionales, id]);
    //Enviamos nuestra informacion a la BD...
    await pool.query('UPDATE portatiles_software set ? WHERE psw_ipt = ?', [editLaptopSW, id]);
    //Enviamos nuestra informacion a la BD...
    await pool.query('UPDATE portatiles_soporte_remoto set ? WHERE psr_ipt = ?', [editRemotoLaptop, id]);
    //Enviamos nuestra informacion a la BD...
    await pool.query('UPDATE portatiles_informacion_administrativa set ? WHERE pia_ipt = ?', [editAdministrativaLaptop, id]);
    //Creamos un mensaje con flash-connect
    req.flash('UpdateSwSuccess', 'El equipo portatil se a actualizado satisfactoriamente.');
    //Redireccionamos a la ruta de inicio...
    res.redirect('/laptops');
});


//Creamos la ruta /edit para la peticion GET
router.get('/info/:phw_ipt', isLoggedIn, async (req, res) => {
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
    const portatilIHW = await pool.query('SELECT * FROM portatiles_hardware WHERE phw_ipt = ?', [id]);
    //Enviamos el query con el ID a consultar...
    const portatilIDA = await pool.query('SELECT * FROM portatiles_dispositivos_adicionales WHERE pda_ipt = ?', [id]);
    //Enviamos el query con el ID a consultar...
    const portatilISW = await pool.query('SELECT * FROM portatiles_software WHERE psw_ipt = ?', [id]);
    //Enviamos el query con el ID a consultar...
    const portatilISR = await pool.query('SELECT * FROM portatiles_soporte_remoto WHERE psr_ipt = ?', [id]);
    //Enviamos el query con el ID a consultar...
    const portatilIIA = await pool.query('SELECT * FROM portatiles_informacion_administrativa WHERE pia_ipt = ?', [id]);
    /*
    //Mostramos el resultado por consola...
    console.log(portatilHW[0]);
    */
    //Renderisa en la ventana edit el contenido de software base
    res.render('laptops/info', { 
        portatilIHW: portatilIHW[0], 
        portatilISW: portatilISW[0], 
        portatilIDA: portatilIDA[0], 
        portatilISR: portatilISR[0],
        portatilIIA: portatilIIA[0] 
    });
    //Creamos un mensaje con flash-connect
    req.flash('SearchSwSuccess', 'Esta es la informacion del portatil.');
});


//Exportamos router...
module.exports = router;