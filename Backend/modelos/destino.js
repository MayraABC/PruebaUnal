'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var DestinoSchema = schema({
	destino: String,
	precio: Number,
	duracion: Number,
	imagen: String,
});

module.exports = mongoose.model('Destino', DestinoSchema);
