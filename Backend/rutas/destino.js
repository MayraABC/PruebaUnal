'use strict';

var express = require('express');
var controladorDestino = require('../controladores/destino');
var enrutador = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './img'});

/**
 * @swagger
 * /api/destino:
 *  post:
 *      description: Guardar destino.
 *      responses:
 *      200:
 *          description: Se guardó el registro.
 */
enrutador.post('/destino', controladorDestino.guardarDestino);

/**
 * @swagger
 * /api/destino:
 *  get:
 *      description: Listar destino.
 *      responses:
 *      200:
 *          description: Consulta con éxito.
 */
enrutador.get('/destino', controladorDestino.listarDestino);

/**
 * @swagger
 * /api/destino/{id}:
 *  get:
 *      description: Detalle de destino.
 *      responses:
 *      200:
 *          description: Consulta con éxito.
 */
enrutador.get('/destino/:id', controladorDestino.detalleDestino);

/**
 * @swagger
 * /api/destino/{id}:
 *  put:
 *      description: Actualizar destino.
 *      responses:
 *      200:
 *          description: Se actualizó el registro.
 */
enrutador.put('/destino/:id', controladorDestino.actualizarDestino);

/**
 * @swagger
 * /api/destino/{id}:
 *  delete:
 *      description: Eliminar destino.
 *      responses:
 *      200:
 *          description: Se elimino el registro.
 */
enrutador.delete('/destino/:id', controladorDestino.borrarDestino);

/**
 * @swagger
 * /api/destino/{id}/archivo:
 *  post:
 *      description: Guardar imagen destino.
 *      responses:
 *      200:
 *          description: Se guardó el registro.
 */
enrutador.post(
	'/destino/:id/archivo',
	multipartMiddleware,
	controladorDestino.subirImagen
);

module.exports = enrutador;
