'use strict';

var express = require('express');
var controladorTestimonio = require('../controladores/testimonio');
var enrutador = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './img'});

/**
 * @swagger
 * /api/testimonio:
 *  post:
 *      description: Guardar testimonio.
 *      responses:
 *      200:
 *          description: Se guardó el registro.
 */
enrutador.post('/testimonio', controladorTestimonio.guardarTestimonio);

/**
 * @swagger
 * /api/testimonio:
 *  get:
 *      description: Listar testimonio.
 *      responses:
 *      200:
 *          description: Consulta con éxito.
 */
enrutador.get('/testimonio', controladorTestimonio.listarTestimonio);

/**
 * @swagger
 * /api/testimonio/{id}:
 *  get:
 *      description: Detalle de testimonio.
 *      responses:
 *      200:
 *          description: Consulta con éxito.
 */
enrutador.get('/testimonio/:id', controladorTestimonio.detalleTestimonio);

/**
 * @swagger
 * /api/testimonio/{id}:
 *  put:
 *      description: Actualizar testimonio.
 *      responses:
 *      200:
 *          description: Se actualizó el registro.
 */
enrutador.put('/testimonio/:id', controladorTestimonio.actualizarTestimonio);

/**
 * @swagger
 * /api/testimonio/{id}:
 *  delete:
 *      description: Eliminar testimonio.
 *      responses:
 *      200:
 *          description: Se elimino el registro.
 */
enrutador.delete('/testimonio/:id', controladorTestimonio.borrarTestimonio);

/**
 * @swagger
 * /api/testimonio/{id}/archivo:
 *  post:
 *      description: Guardar imagen testimonio.
 *      responses:
 *      200:
 *          description: Se guardó el registro.
 */
enrutador.post(
	'/testimonio/:id/archivo',
	multipartMiddleware,
	controladorTestimonio.subirImagen
);

module.exports = enrutador;
