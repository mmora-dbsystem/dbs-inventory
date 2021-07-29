//Inicializaciones...
//Inicializamos express...
const express = require('express');
//Inicializamos morgan...
const morgan = require('morgan');
//Inicializamos las plantllas de express-handlebears...
const exphbs = require('express-handlebars');
//Inicializamos el modulo path de express...
const path = require('path');
const exp = require('constants'); //Generado automaticamente...
//Inicializamos el modulo de mensajes el cual es connectt-flas...
const flash = require('connect-flash');
//Inicializamos el modulo de sesiones para el uso de flash...
const esessions = require('express-session');
//Inicializamos el modulo express-mysql-session para almacenar las sesiones en la BD...
const MySQLStore = require('express-mysql-session');
//Importamos el archivo keys para la ruta de la BD...
const { database } = require('./keys');
//Importamos el metodo passport...
const passport = require('passport');
const { session } = require('passport'); //Generado automaticamente...


//Instanciamientos...
//Ejecutamos express en la constante para la aplicaccion app...
const app = express();
//Inicializamos passport con la informacion de su respectivo archivo...
require('./lib/passport.js');

//Configuraciones...
//Asignamos el puerto 4000 para el servidor de express, siempre y cuando no este en uso...
app.set('port', process.env.PORT || 4000);
//Definimos la ruta de la carpeta de vistas... "__dirname obtiene la ruta donde estoy"
app.set('views', path.join(__dirname, 'views'));
//Configuramos las plantillas...
app.engine('.hbs', exphbs({
    //Bombre de la plantilla principal...
    defaultLayout: 'main',
    //Definimos la direccion donde estan las plantillas...
    layoutsDir: path.join(app.get('views'), 'layouts'),
    //Definimos la direccion de partials, esta sera para reutilizar fragmentos de codigo...
    partialsDir: path.join(app.get('views'), 'partials'),
    //Esta propiedad es para definir extenciones que tendran los archivos de handlebars...
    extname: '.hbs',
    //Configuramos la ruta donde se almacenaran las funciones de handlebars...
    helpers: require('./lib/handlebars.js')
}));
//Inicializamos el motor...
app.set('view engine', '.hbs');


//Middlewares ()
//Indicamos que nuestra aplicacion usara morgan con el parametro dev, el cual muestra que esta llegando a nuestra aplicacion...
app.use(morgan('dev'));
//Este metodo acepta desde los formularios los datos que envien los usuarios...
app.use(express.urlencoded({ extended: false }));
//indicamos que se usara express...
app.use(express.json());
//Inicializamos la sesion para el uso de flash...
app.use(esessions({
    //Nombre con el que se almacenaran las sesiones...
    secret: 'dbs-inventory',
    //Opcion para renovado de sesion...
    resave: false,
    //Opcion para restablecer la sesion...
    saveUninitialized: false,
    //Almacenamiento de la sesion...
    store: new MySQLStore(database)
}));
//Indicamos que se usara el connect-flas para los mensajes...
app.use(flash());
//Inicializamos passport...
app.use(passport.initialize());
//Generamos una sesion donde se almacenara la informacion de passport...
app.use(passport.session());


//Variables globales...
//Funcion para requerimientos y respuestas
app.use((req, res, next) => {
    //Creamos una variable global para el uso del mensaje... 
    app.locals.AddSwSuccess = req.flash('AddSwSuccess');
    //Creamos una variable global para el uso del mensaje... 
    app.locals.DeleteSwSuccess = req.flash('DeleteSwSuccess');
    //Creamos una variable global para el uso del mensaje... 
    app.locals.SearchSwSuccess = req.flash('SearchSwSuccess');
    //Creamos una variable global para el uso del mensaje... 
    app.locals.UpdateSwSuccess = req.flash('UpdateSwSuccess');
    //Creamos una variable global para el uso del MensajeError... 
    app.locals.MensajeError = req.flash('MensajeError');
    //Creamos una variable global para el uso del MensajeOK... 
    app.locals.MensajeOK = req.flash('MensajeOK');
    //Variable global para el nombre del usuario...
    app.locals.user = req.user;
    //Esta funcion toma la informacion para continuar...
    next();
});


//Rutas...
//Usamos nuestra ruta inicial...
app.use(require('./routes/index.js'));
//Ruta para la autenticacion del usuario...
app.use(require('./routes/authentication.js'));
//Ruta para el manejo de los softwaren base que enviaremos y o recibiremos en el movimiento de la aplicacion...
app.use('/softwares', require('./routes/softwares.js'));
//Ruta para el manejo de las URLs que enviaremos y o recibiremos en el movimiento de la aplicacion...
app.use('/urls', require('./routes/urls.js'));
//Ruta para el manejo del Inventario de portatiles que enviaremos y o recibiremos en el movimiento de la aplicacion...
app.use('/laptops', require('./routes/laptops.js'));


//Archivos publicos...
//Configuramos la ruta de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));


//Inicializacion del servidor...
app.listen(app.get('port'), () => {
    //Mensaje en consola...
    console.log('Corriendo sobre el puerto: ', app.get('port'), '...');
});