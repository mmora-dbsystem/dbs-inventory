//Instanciamos express...
const express = require('express');
const { Passport } = require('passport');
//Instanciamos el modulo router de express...
const router = express.Router();
//Importamos passport...
const passport = require('passport');
const { route } = require('./index.js');//Se genera solo...


//Creamos la ruta para registrar un usuario con el metodo GET...
router.get('/signup', (req, res) => {
    //Renderisamos la ruta /singup
    res.render('auth/signup.hbs');
});

////Utilizamos passport 
router.post('/signup', passport.authenticate('local.signup', {
    //REdirecciona cuando todo esta OK a la vista profile...
    successRedirect: '/profile',
    //Redireccionamos a la vista si da error.
    failureRedirect: '/signup',
    //Permite enviar mensaje en caso de error al registrar el logueo
    failureFlash: true
}));


//Creamos la ruta PROFILE...
router.get('/profile', (req, res) => {
    //Enviamos la siguiente respuesta...
    res.send('Este es tu profile');
});

//Exportamos router...
module.exports = router;