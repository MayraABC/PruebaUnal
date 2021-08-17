'use strict';
// Importar
var app = require('./app');

// Declaraciones
var puerto = 3700;

/* Cargar o importar el modulo de mongoose */
var mongoose = require('mongoose');

/* para usar la base de datos, la conexion*/
mongoose.Promise = global.Promise;

mongoose
	.connect(
		'mongodb+srv://lab101-test:DHvt2wnBLg3oFj@lab101-test-db.mtb2u.mongodb.net/MayraABC?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('Conexión a la Base de datos establecida con éxito.');

		app.listen(puerto, () => {
			console.log('Servidor corriendo correctamente en la url: localhost:3700');
		});
	})
	.catch((err) => console.log(err));
