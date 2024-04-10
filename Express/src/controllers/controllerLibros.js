const db = require('../database/models')
const Libro = db.Libro;
const Genero = db.Genero;
const path = require('path')
const fs = require('fs')


const controller = {
    libros: async (req, res) => {
        try {
            const librosAll = await Libro.findAll({
                include: 'Genero'
            });

            librosAll.map(libro => {
                if(libro.imagen) {
                    libro.imagen = 'http://localhost:5555/img/libros/' + libro.imagen
                }
            })
            
            res.status(200).json({
                count: librosAll.length,
                data: librosAll
            })
        } catch(error) {
            res.status(500).json({mensaje: 'Error al buscar los libros.'})
        }
    },
    
    buscarLibro: async (req, res) => {
        try {
            const id = parseInt(req.params.id)

            const libro = await Libro.findByPk(id);
            
            if(!libro) {
                return res.status(400).json({mensaje: 'El libro no se encontro'})
            }

            res.status(200).json({
                data: libro
            })
        } catch(error) {
            res.status(500).json({mensaje: 'Error al buscar el libros.'})
        }
    },

    crearLibro: async(req, res) => {
        try {

            const libro = {
                nombre: req.body.nombre,
                imagen: req.file.filename,
                genero_id: req.body.genero_id
            }

            const crearLibro = await Libro.create(libro)

            res.status(201).json({
                data: crearLibro
            })
        } catch(error) {
            res.status(500).json({mensaje: 'El libro no se pudo crear.'})
        }
    },

    editarLibro: async(req, res) => {
        try {
            const id = parseInt(req.params.id)

            const libroAEditar = await Libro.findByPk(id)
            
            if(req.file) {
                if(libroAEditar.imagen) {
                    const imagePath = path.join(__dirname, '..', '..', 'public', 'img', 'libros', libroAEditar.imagen);
                    fs.unlinkSync(imagePath);
                }
            }

            const editarLibro = await Libro.update({
                nombre: req.body.nombre,
                imagen: req.file ? req.file.filename : (libroAEditar.imagen ? libroAEditar.imagen : null),
                genero_id: req.body.genero_id
            }, {
                where: {
                    id: id
                }
            })
            console.log(libroAEditar)

            if(libroAEditar === null) {
                return res.status(402).json({mensaje: 'El libro no existe'})
            }

            res.status(200).json({
                data: 'Editado con exito'
            })
        } catch(error) {
            res.status(500).json({mensaje: 'El libro no se pudo editar.'})
        }
    },

    borrarLibro: async(req, res) => {
        try {
            const id = parseInt(req.params.id)

            const libroABorrar = await Libro.findByPk(id)

            if(libroABorrar.imagen) {
                const imagePath = path.join(__dirname, '..', '..', 'public', 'img', 'libros', libroABorrar.imagen);
                fs.unlinkSync(imagePath);
            }
        
            const borrarLibro = await Libro.destroy({
                where: {
                    id: id
                }
            })

            res.status(200).json({
                data: 'Borrado con exito'
            })
        } catch(error) {
            res.status(500).json({mensaje: 'El libro no se pudo borrar.'})
        }
    },
}

module.exports = controller;