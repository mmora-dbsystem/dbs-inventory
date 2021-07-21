//Instanciamos express...
const express = require('express');
//Instanciamos el modulo router de express...
const router = express.Router();


//Creamos la ruta para registrar un usuario con el metodo GET...
router.get('/signup', (req,res) => {
    //Renderisamos la ruta /singup
    res.render('auth/signup.hbs');
});

//Creamos la ruta para registrar un usuario con el metodo POST...
router.post('/signup', (req,res) => {
    console.log(req.body);
    //Renderisamos la ruta /singup
    res.send('Recibido');
});

//Exportamos router...
module.exports = router;