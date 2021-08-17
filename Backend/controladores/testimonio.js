'use strict';

var Testimonio = require('../modelos/testimonio');
var fs = require('fs');

function aleatorios(lista) {
	return [...lista].sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 3);
}

var controlador = {
	guardarTestimonio: function (req, res) {
		var testimonio = new Testimonio();
		var item = req.body;

		testimonio.nombre = item.nombre;
		testimonio.cargo = item.cargo;
		testimonio.ubicacion = item.ubicacion;
		testimonio.comentario = item.comentario;
		testimonio.imagen = null;

		testimonio.save((err, testimonioStored) => {
			if (err)
				return res
					.status(500)
					.send({message: 'Error al guardar el testimonio.'});

			if (!testimonioStored)
				return res
					.status(404)
					.send({message: 'No se pudo guardar el testimonio.'});

			return res.status(200).send({testimonio: testimonioStored});
		});
	},

	listarTestimonio: function (req, res) {
		Testimonio.find().exec((err, testimonios) => {
			if (err)
				return res.status(500).send({message: 'Error al consultar los datos'});

			if (!testimonios)
				return res
					.status(404)
					.send({message: 'No hay testimonios que mostrar.'});

			testimonios = aleatorios(testimonios);
			return res.status(200).send({testimonios});
		});
	},

	detalleTestimonio: function (req, res) {
		var testimonioId = req.params.id;

		if (testimonioId == null) {
			return res.status(404).send({message: 'El testimonio no existe.'});
		}

		Testimonio.findById(testimonioId, (err, testimonio) => {
			if (err)
				return res.status(500).send({message: 'Error al devolver los datos.'});

			if (!testimonio)
				return res.status(404).send({message: 'El testimonio no existe.'});

			return res.status(200).send(testimonio);
		});
	},

	actualizarTestimonio: function (req, res) {
		var testimonioId = req.params.id;
		var actualizar = req.body;

		Testimonio.findByIdAndUpdate(
			testimonioId,
			actualizar,
			{new: true},
			(err, testimonioActualizado) => {
				if (err) return res.status(500).send({message: 'Error al actualizar.'});

				if (!testimonioActualizado)
					return res
						.status(404)
						.message({message: 'No existe testimonio para actualizar.'});

				return res.status(200).send({testimonio: testimonioActualizado});
			}
		);
	},

	borrarTestimonio: function (req, res) {
		var testimonioId = req.params.id;

		Testimonio.findByIdAndRemove(testimonioId, (err, testimonioBorrado) => {
			if (err)
				return res
					.status(500)
					.message({message: 'No se ha podido borrar el testimonio.'});

			if (!testimonioBorrado)
				return res
					.status(404)
					.message({message: 'No se puede eliminar el testimonio.'});

			return res.status(200).send({
				testimonio: testimonioBorrado,
			});
		});
	},

	subirImagen: function (req, res) {
		var testimonioId = req.params.id;
		var mensaje = 'La imagen no se pudo subir...';

		if (req.files) {
			var archivoRuta = req.files.imagen.path;
			var archivoSplit = archivoRuta.split('\\');
			var archivoNombre = archivoSplit[1];
			var extSplit = archivoNombre.split('.');
			var archivoExt = extSplit[1];

			if (
				archivoExt == 'png' ||
				archivoExt == 'jpg' ||
				archivoExt == 'jpeg' ||
				archivoExt == 'gif'
			) {
				Testimonio.findByIdAndUpdate(
					testimonioId,
					{imagen: archivoNombre},
					{new: true},
					(err, testimonioActualizado) => {
						if (err)
							return res
								.status(500)
								.send({message: 'La imagen no se ha subido.'});

						if (!testimonioActualizado)
							return res.status(404).send({
								message:
									'El testimonio no existe y no se ha asignado la imagen.',
							});

						return res.status(200).send({
							testimonio: testimonioActualizado,
						});
					}
				);
			} else {
				fs.unlink(archivoRuta, (err) => {
					return res.status(200).send({message: 'La extensión no es valida.'});
				});
			}
		} else {
			return res.status(500).send({
				message: mensaje,
			});
		}
	},
};

module.exports = controlador;
