'use strict';

var Destino = require('../modelos/destino');
var fs = require('fs');

var controlador = {
	guardarDestino: function (req, res) {
		var destino = new Destino();
		var item = req.body;

		destino.destino = item.destino;
		destino.precio = item.precio;
		destino.duracion = item.duracion;
		destino.imagen = null;

		destino.save((err, destinoStored) => {
			if (err)
				return res.status(500).send({message: 'Error al guardar el destino.'});

			if (!destinoStored)
				return res
					.status(404)
					.send({message: 'No se pudo guardar el destino.'});

			return res.status(200).send({destino: destinoStored});
		});
	},

	listarDestino: function (req, res) {
		Destino.find()
			.sort('destino')
			.exec((err, destinos) => {
				if (err)
					return res
						.status(500)
						.send({message: 'Error al consultar los datos'});

				if (!destinos)
					return res
						.status(404)
						.send({message: 'No hay destinos que mostrar.'});

				return res.status(200).send({destinos});
			});
	},

	detalleDestino: function (req, res) {
		var destinoId = req.params.id;

		if (destinoId == null) {
			return res.status(404).send({message: 'El destino no existe.'});
		}

		Destino.findById(destinoId, (err, destino) => {
			if (err)
				return res.status(500).send({message: 'Error al devolver los datos.'});

			if (!destino)
				return res.status(404).send({message: 'El destino no existe.'});

			return res.status(200).send(destino);
		});
	},

	actualizarDestino: function (req, res) {
		var destinoId = req.params.id;
		var actualizar = req.body;

		Destino.findByIdAndUpdate(
			destinoId,
			actualizar,
			{new: true},
			(err, destinoActualizado) => {
				if (err) return res.status(500).send({message: 'Error al actualizar.'});

				if (!destinoActualizado)
					return res
						.status(404)
						.message({message: 'No existe destino para actualizar.'});

				return res.status(200).send({destino: destinoActualizado});
			}
		);
	},

	borrarDestino: function (req, res) {
		var destinoId = req.params.id;

		Destino.findByIdAndRemove(destinoId, (err, destinoBorrado) => {
			if (err)
				return res
					.status(500)
					.message({message: 'No se ha podido borrar el destino.'});

			if (!destinoBorrado)
				return res
					.status(404)
					.message({message: 'No se puede eliminar el destino.'});

			return res.status(200).send({
				destino: destinoBorrado,
			});
		});
	},

	subirImagen: function (req, res) {
		var destinoId = req.params.id;
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
				Destino.findByIdAndUpdate(
					destinoId,
					{imagen: archivoNombre},
					{new: true},
					(err, destinoActualizado) => {
						if (err)
							return res
								.status(500)
								.send({message: 'La imagen no se ha subido.'});

						if (!destinoActualizado)
							return res.status(404).send({
								message: 'El destino no existe y no se ha asignado la imagen.',
							});

						return res.status(200).send({
							destino: destinoActualizado,
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
