//String de conexion de BD...
//Importamos el bojeto de la BD
module.exports = {
    //Nombre del objeto a exportar...
    database: {
        //Hostname o IP del servidor de base de datos...
        //Desarrollo 
        //host: 'localhost',
        //Produccion
        host: '192.168.100.12',
        //Nombre de usuario para la conexion de BD...
        //Desarrollo
        //user: 'root',
        //Produccion
        user: 'dbsinventory',
        //Contraseña del usuario de BD...
        //Desarrollo
        //password: '',
        //Produccion
        password: 'dbsinventory123*',
        //Nombre de la BD...
        database: 'dbs_inventory'
    }
};