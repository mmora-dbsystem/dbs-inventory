Creamos el archivo package.json
npm init --yes
instalamos fw express y sus complementos
express-handlebars = es la integracion del motor de plantillas 
express-session = es para crear sesiones y almacenar informacion en estas
mysql = para base de datos
express-mysql-session = es para crear sesiones y almacenar informacion en estas para la bd
morgan = permite crear logs o mensajes de que es lo que las aplicaciones cliente estan pidiendo del servidor
bcryptjs = permite cifrar las contraseñas
passport = permite la autenticacion
passport-local = crea de forma local
timeago.js = permite mostrar fechas de formatos hacia atras
connect-flash = movimineto entre vistas
express-validator = permite validar los datos enviados
npm i express express-handlebars express-session mysql express-mysql-session morgan bcryptjs passport passport-local timeago.js connect-flash express-validator
creamos una carpeta llamada src
instalamos nodemon en modo de desarrollo
npm i nodemon -D
nos dirigimos a src
creamos las siguientes carpetas
mkdir lib public routes views
creamos los siguientes archivos
index.js
database.js
keys.js

trabajamos sobre index.js

configuramos el package.json creando los siguientes comandos: dev
"dev": "nodemon src/index.js"
provamos que el servicio se este ejecutando en el puerto
npm run dev

en la carpeta routes creamos un archivo llamado index.js 

Creamos 2 carpetas en views llamadas layouts, partials y en layouts creamos la plantilla main.hbs

creamos dentro de la carpeta lib un archivo llamado handlebars.js

creamos en la carpeta de rutas un archivo authentication.js y links.js

creamos la carpeta database en la raiz del proyecto y en ella creamos los archivos*.sql con los query...

En el archivo keys.js parametrisamos los datos de la BD...
Editamos el archivo database.js con el string de conexion de la BD...



