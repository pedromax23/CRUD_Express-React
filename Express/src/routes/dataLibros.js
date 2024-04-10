const express = require('express');
const router = express.Router();
const multer = require('../middlewares/routes/multerCrearLibro')

const controllerLibros = require('../controllers/controllerLibros');

router.get('/', controllerLibros.libros)

router.get('/:id', controllerLibros.buscarLibro)

router.delete('/borrar/:id', controllerLibros.borrarLibro)

router.put('/editar/:id', multer.single('imagen'), controllerLibros.editarLibro)

router.post('/crear', multer.single('imagen'), controllerLibros.crearLibro)

module.exports = router;