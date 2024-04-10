const db = require('../database/models')
const Libro = db.Libro;
const Genero = db.Genero;


const controller = {
    generos: async (req, res) => {
        try {
            const generosAll = await Genero.findAll({
                include: 'Libro'
            });
            
            res.status(200).json({
                count: generosAll.length,
                data: generosAll
            })
        } catch(error) {
            res.status(500).json({mensaje: 'Error al buscar los generos.'})
        }
    },

    crearGenero: async(req, res) => {
        try {
            const crearGenero = await Genero.create(req.body)

            res.status(201).json({
                data: crearGenero
            })
        } catch(error) {
            res.status(500).json({mensaje: 'El genero no se pudo crear.'})
        }
    },

    borrarGenero: async(req, res) => {
        try {
            const id = parseInt(req.params.id)

            console.log(id)
            const borrarGenero = await Genero.destroy({
                where: {
                    id: id
                }
            })

            res.status(200).json({
                data: 'Borrado con exito'
            })
        } catch(error) {
            res.status(500).json({mensaje: 'El genero no se pudo borrar.'})
        }
    },
}

module.exports = controller;