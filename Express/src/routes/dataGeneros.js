const express = require('express');
const router = express.Router();

const controllerGeneros = require('../controllers/controllerGeneros');

router.get('/', controllerGeneros.generos)

router.delete('/borrar/:id', controllerGeneros.borrarGenero)

router.post('/crear', controllerGeneros.crearGenero)

module.exports = router;