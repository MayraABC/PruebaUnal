'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ServicioSchema = schema({
	nombre: String,
	descripcion: String,
	imagen: String,
});

module.exports = mongoose.model('Servicio', ServicioSchema);
