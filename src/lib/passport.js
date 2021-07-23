//Importamos el metodo passport...
const passport = require('passport');
//Importamos el modulo pasport.local...
const LocalStrategy = require('passport-local').Strategy;
//Importamos la conexion con la BD...
const pool = require('../database');
//Importamos helpers...
const helpers = require('../lib/helpers');


//Creamos autenticaciones de forma local...
passport.use('local.signup', new LocalStrategy({
    //Definimos el usuario...
    usernameField: 'usu_cor',
    //Definimos la contraseña...
    passwordField: 'usu_cla',
    //Definimos si recibira mas datos...
    passReqToCallback: true
    //Definimos la funcion que recibira los parametros...
}, async (req, usu_cor, usu_cla, done) => {
    //Creamos un req.body con los campos no invocados...
    const { usu_id, usu_nom, usu_ape } = req.body;
    //console.log(req.body);
    const newUser = {
        usu_cor,
        usu_cla,
        usu_nom,
        usu_ape
    };
    //Ciframos la contraseña...
    newUser.usu_cla = await helpers.encryptPassword(usu_cla);
    //Enviamos la informacion a la BD...
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    newUser.usu_id = result.insertId;
    /*
    //Mostramos por consola...
    console.log(newUser.usu_id);
    console.log(result.insertId);
    console.log(result);
    */
    //Ejecuta el metodo DONE... sin errores devuelve null, y el usuario lo envia para la nueva sesion...
    return done(null, newUser);
}));


//Serializamos nuestro usuario...
passport.serializeUser((usu_cor, done) => {
    //Enviamos el IS para guardar la sesion...
    done(null, usu_cor.usu_id);
});


//Deserializamos nuestro usuario...
passport.deserializeUser(async (usu_id, done) => {
    //Creamos una constante con el resultado de la consulta del usuario logueado...
    const row = await pool.query('SELECT * FROM usuarios WHERE usu_id = ?', [usu_id]);
    //Continuamos con el arreglo obtenido...
    done(null, row[0]);
});


//Creamos el logueo de forma local...
passport.use('local.signin', new LocalStrategy({
    //Recibimos el usuario...
    usernameField: 'usu_cor',
    //Recibimos la contraseña...
    passwordField: 'usu_cla',
    //Habilitamos el pasar mas datos...
    passReqToCallback: true
}, async(req, usu_cor, usu_cla, done) => {
    /**/
    //Validamos por consola...
    console.log(req.body);
    //Validamos por consola...
    console.log(usu_cor);
    //Validamos por consola...
    console.log(usu_cla);
    
   //Validamos el usuario que esta iniciando sesion...
    const rows = await pool.query('SELECT * FROM usuarios WHERE usu_cor = ?', [usu_cor]);
    //Validamos si el usuario encontrado existe...
    if (rows.length > 0) {
        //Creamos una variable para el usuario encontrado...
        const usuario = rows[0];
        //Le pasamos la clave capturada al validador de cifrado de claves...
        const validePassword = await helpers.matchPassword(usu_cla, usuario.usu_cla);
        //Validamos si la clave es correcta
        if(validePassword){
            //USU y CLA OK, Pasamos los datos...
            done (null, usuario, req.flash('MensajeOK', 'Bienvenid@' + usuario.usu_nom + ' ' + usuario.usu_ape + '.'));
        } else {
            //En caso de error en clave...
            done(null, false, req.flash('MensajeError', 'ERROR: Contraseña incorrecta.'));
        }
    } else {
        //En caso de usuario no encontrado...
        return done (null, false, req.flash('MensajeError', 'ERROR: Usuario no existe.'));
    }
    console.log(row[0]);
}));
