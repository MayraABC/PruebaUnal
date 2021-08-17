'use strict';

var express = require('express');
var controladorServicio = require('../controladores/servicio');
var enrutador = express.Router();

/**
 * @swagger
 * /api/servicio:
 *  post:
 *      description: Guardar servicioo.
 *      responses:
 *      200:
 *          description: Se guardó el registro.
 */
enrutador.post('/servicio', controladorServicio.guardarServicio);

/**
 * @swagger
 * /api/servicio:
 *  get:
 *      description: Listar servicio.
 *      responses:
 *      200:
 *          description: Consulta con éxito.
 */
enrutador.get('/servicio', controladorServicio.listarServicio);

/**
 * @swagger
 * /api/servicio/{id}:
 *  get:
 *      description: Detalle de servicio.
 *      responses:
 *      200:
 *          description: Consulta con éxito.
 */
enrutador.get('/servicio/:id', controladorServicio.detalleServicio);

/**
 * @swagger
 * /api/servicio/{id}:
 *  put:
 *      description: Actualizar servicio.
 *      responses:
 *      200:
 *          description: Se actualizó el registro.
 */
enrutador.put('/servicio/:id', controladorServicio.actualizarServicio);

/**
 * @swagger
 * /api/servicio/{id}:
 *  delete:
 *      description: Eliminar servicio.
 *      responses:
 *      200:
 *          description: Se elimino el registro.
 */
enrutador.delete('/servicio/:id', controladorServicio.borrarServicio);

module.exports = enrutador;
