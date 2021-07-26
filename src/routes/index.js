//Instanciamos express...
const express = require('express');
//Instanciamos el modulo router de express...
const router = express.Router();

//Definimos la ruta inicial: "Este se utiliza en index.js //Rutas"
router.get('/', (req, res) => {
    //Enviamos un mensaje
    res.render('index');
})

//Exportamos router...
module.exports = router;