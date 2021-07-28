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
    usernameField: 'usu_cco',
    //Definimos la contraseña...
    passwordField: 'usu_cla',
    //Definimos si recibira mas datos...
    passReqToCallback: true
    //Definimos la funcion que recibira los parametros...
}, async (req, usu_cco, usu_cla, done) => {
    //Creamos una variable para el tipo de usuario
    var tipoUsuario = {};
    //Creamos una variable para el estado del usuario
    var estadoUsuario = 1;
    //Validamos el tipo de usuario que se recibe...
    if(req.body.usu_tus=='Administrador'){
        tipoUsuario=1;
    }
    if(req.body.usu_tus=='Operador'){
        tipoUsuario=2;
    }
    if(req.body.usu_tus=='Consultor'){
        tipoUsuario=3;
    }
    //Creamos un req.body con los campos no invocados...
    const { usu_id, usu_nom, usu_ape, usu_cpe, usu_tus, usu_eus } = req.body;
    console.log(req.body);
    const newUser = {
        usu_cco,
        usu_cla,
        usu_nom,
        usu_ape,
        usu_cpe, 
        usu_tus: tipoUsuario,
        usu_eus: estadoUsuario
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


//Creamos el logueo de forma local...
passport.use('local.signin', new LocalStrategy({
    //Recibimos el usuario...
    usernameField: 'usu_cco',
    //Recibimos la contraseña...
    passwordField: 'usu_cla',
    //Habilitamos el pasar mas datos...
    passReqToCallback: true
}, async(req, usu_cco, usu_cla, done) => {
    /*
    //Validamos por consola...
    console.log(req.body);
    //Validamos por consola...
    console.log(usu_cco);
    //Validamos por consola...
    console.log(usu_cla);
    */
   //Validamos el usuario que esta iniciando sesion...
    const rows = await pool.query('SELECT * FROM usuarios WHERE usu_cco = ?', [usu_cco]);
    //Validamos si el usuario encontrado existe...
    if (rows.length > 0) {
        //Creamos una variable para el usuario encontrado...
        const user = rows[0];
        //Le pasamos la clave capturada al validador de cifrado de claves...
        const validePassword = await helpers.matchPassword(usu_cla, user.usu_cla);
        //Validamos si la clave es correcta
        if(validePassword){
            //USU y CLA OK, Pasamos los datos...
            done (null, user, req.flash('MensajeOK', 'Bienvenid@: ' + user.usu_nom + ' ' + user.usu_ape + '.'));
        } else {
            //En caso de error en clave...
            done(null, false, req.flash('MensajeError', 'ERROR: Contraseña incorrecta.'));
        }
    } else {
        //En caso de usuario no encontrado...
        return done (null, false, req.flash('MensajeError', 'ERROR: Usuario no existe.'));
    }
    //console.log(row[0]);
}));


//Serializamos nuestro usuario...
passport.serializeUser((user, done) => {
    //Enviamos el IS para guardar la sesion...
    done(null, user.usu_id);
});


//Deserializamos nuestro usuario...
passport.deserializeUser(async (usu_id, done) => {
    //Creamos una constante con el resultado de la consulta del usuario logueado...
    const row = await pool.query('SELECT * FROM usuarios WHERE usu_id = ?', [usu_id]);
    //Continuamos con el arreglo obtenido...
    done(null, row[0]);
});