//Iniciamos el modulo de MySQL...
const mysql = require('mysql');
//Importamos el objeto de base de datos...
const { database } = require('./keys.js');
const { connect } = require('./routes/index.js');
//Instanciamos el modulo util, para el envio de promesas de MySQL...
const { promisify } = require('util')

//Generamos la conexion...
const pool = mysql.createPool(database);
//Iniciamos la conexion...
pool.getConnection((err, connection) => {
    //Validamos la conexion...
    if (err) {
        //Valida error por cierre en la conexion de la BD...
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('ERROR: "' + err.code + '", La conexion con la BD ha sido cerrada, por favor validar.');
        }
        //Valida error por demaciadas sesiones activas en la BD...
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('ERROR: "' + err.code + '", La BD tiene muchas conexiones, por favor validar.');
        }
        //Valida conexion rechazada...
        if (err.code === 'ECONNREFUSED') {
            console.log(err.code);
            console.log('ERROR: "' + err.code + '", La conexion a la base de datos ha sido rechazada.');
        }
    }
    //Valida conexion satisfactoria
    if (connection) {
        //Realiza la conexion a la BD...
        connection.release();
        console.log('Conexion exitosa con la BD.');
        return;
    }
});

//Permite el uso de promesas...
pool.query = promisify(pool.query);
//Exportamos la conexion...
module.exports = pool;
