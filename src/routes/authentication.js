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
    //Renderizamos la vista profile.hbs
    res.render('profile');
});


//Creamos la ruta para el logueo para el metodo GET...
router.get('/signin', (req, res) =>{
    //Renderisamos la vista de signin...
    res.render('auth/signin');
});


//Creamos la ruta para el logueo para el metodo POST...
router.post('/signin', (req,res, next) => {
    //Usamos local.signin...
    passport.authenticate('local.signin', {
        //Si autentica OK...
        successRedirect: '/profile',
        //Si arroja error...
        failureRedirect: '/signin', 
        //Permitimos el envio de mensajes...
        failureFlash: true
    })(req,res, next);
});


//Exportamos router...
module.exports = router;