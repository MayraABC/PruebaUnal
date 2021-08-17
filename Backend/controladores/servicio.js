'use strict';

var Servicio = require('../modelos/servicio');

var controlador = {
	guardarServicio: function (req, res) {
		var servicio = new Servicio();
		var item = req.body;

		servicio.nombre = item.nombre;
		servicio.descripcion = item.descripcion;
		servicio.imagen = item.imagen;

		servicio.save((err, servicioStored) => {
			if (err)
				return res.status(500).send({message: 'Error al guardar el servicio.'});
			if (!servicioStored)
				return res
					.status(404)
					.send({message: 'No se pudo guardar el servicio.'});
			return res.status(200).send({servicio: servicioStored});
		});
	},

	listarServicio: function (req, res) {
		Servicio.find()
			.sort('nombre')
			.exec((err, servicios) => {
				if (err)
					return res
						.status(500)
						.send({message: 'Error al consultar los datos'});

				if (!servicios)
					return res
						.status(404)
						.send({message: 'No hay servicios que mostrar.'});

				return res.status(200).send({servicios});
			});
	},

	detalleServicio: function (req, res) {
		var servicioId = req.params.id;

		if (servicioId == null) {
			return res.status(404).send({message: 'El servicio no existe.'});
		}

		Servicio.findById(servicioId, (err, servicio) => {
			if (err)
				return res.status(500).send({message: 'Error al devolver los datos.'});

			if (!servicio)
				return res.status(404).send({message: 'El servicio no existe.'});

			return res.status(200).send(servicio);
		});
	},

	actualizarServicio: function (req, res) {
		var servicioId = req.params.id;
		var actualizar = req.body;

		Servicio.findByIdAndUpdate(
			servicioId,
			actualizar,
			{new: true},
			(err, servicioActualizado) => {
				if (err) return res.status(500).send({message: 'Error al actualizar.'});

				if (!servicioActualizado)
					return res
						.status(404)
						.message({message: 'No existe servicio para actualizar.'});

				return res.status(200).send({servicio: servicioActualizado});
			}
		);
	},

	borrarServicio: function (req, res) {
		var servicioId = req.params.id;

		Servicio.findByIdAndRemove(servicioId, (err, servicioBorrado) => {
			if (err)
				return res
					.status(500)
					.message({message: 'No se ha podido borrar el servicio.'});

			if (!servicioBorrado)
				return res
					.status(404)
					.message({message: 'No se puede eliminar el servicio.'});

			return res.status(200).send({
				servicio: servicioBorrado,
			});
		});
	},
};

module.exports = controlador;
