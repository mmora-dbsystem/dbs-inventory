//Importamos bcryptjs para el encriptamiento de las claves...
const bcrypt = require('bcryptjs')
//Creamos la constante helpers...
const helpers = {};

//Definimos el metodo de cifrado de contraseña...
helpers.encryptPassword = async (usu_cla) => {
    //Generamos un algoritmo HASH por (n) veces
    const salt = await bcrypt.genSalt(10);
    //Creamos el hash "Password encriptado"... 
    const hash = await bcrypt.hash(usu_cla, salt);
    //Retornamos la clave cifrada...
    return hash;
};


//Definimos el metodo para validar la contraseña... 
helpers.matchPassword = async (usu_cla, SAVE_usu_cla) => {
    //Validamos la comparacion a travez de un TryCatch
    try{
         //Compara la clave digitada con la que esta almacenada en la BD...
        return await bcrypt.compare(usu_cla, SAVE_usu_cla);
    }catch(e){
        //Mostramos por consola el error generado... 
        console.log(e);
    }
};

//Exportamos la constante...
module.exports = helpers;