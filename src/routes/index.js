//Instanciamos express...
const express = require('express');
//Instanciamos el modulo router de express...
const router = express.Router();
//Importamos el metodo autentications para asegurar las trutas...
const { isLoggedIn,  isNotLoggedIn} = require('../lib/auth');

//Definimos la ruta inicial: "Este se utiliza en index.js //Rutas"
router.get('/', isNotLoggedIn, (req, res) => {
    //Enviamos un mensaje
    res.render('index');
})

//Exportamos router...
module.exports = router;