'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var TestimonioSchema = schema({
	imagen: String,
	nombre: String,
	cargo: String,
	ubicacion: String,
	comentario: String,
});

module.exports = mongoose.model('Testimonio', TestimonioSchema);
