import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'

function EditarLibro() {
    const { id } = useParams()
    const navegacion = useNavigate()
    
    const [generos, setGeneros] = useState([]);
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState(1);
    const [foto, setFoto] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dataGeneros, dataLibro] = await Promise.all([
                    fetch('http://localhost:5555/api/dataGeneros').then(res => res.json()),
                    fetch('http://localhost:5555/api/dataLibros/' + id).then(res => res.json())
                ]);

                setGeneros(dataGeneros.data);

                setNombre(dataLibro.data.nombre);
                setGenero(dataLibro.data.genero_id);
            } catch(error) {
                console.error('Error al obtener datos: ', error)
            }
        }

        fetchData()
    }, [])

    const editarLibro = (event) => {
        event.preventDefault()

        const formData = new FormData();
        
        formData.append('nombre', nombre);
        formData.append('genero_id', genero)
        if(foto) {
            formData.append('imagen', foto);
        }

        fetch('http://localhost:5555/api/dataLibros/editar/' + id, {
            method: 'PUT',
            body: formData
        })
        .then(res => {
            if(res.ok) {
                navegacion("/libros")
                console.log('Libro editado con exito')
            } else {
                throw new Error('Error al editar el libro')
            }
        })
        .catch(error => {
            console.error('Error al editar el libro:', error)
        })   
    }

    return (
        <section className="">
            <form onSubmit={editarLibro}>
                <div className="nombre">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                    />
                </div>

                <div className="foto">
                    <label htmlFor="foto"></label>
                    <input type="file" id="foto" onChange={(event) => setFoto(event.target.files[0])}/>
                </div>

                <div className="generos">
                    <label htmlFor="genero">Elije un genero</label>
                    <select id="genero" value={genero} onChange={(event) => setGenero(event.target.value)}>
                    {
                        generos.map((genero, id) => (
                            <option key={'genero'+id} value={genero.id}>{genero.nombre}</option>
                        ))
                    }
                    </select>
                </div>

                <button type="submit">Editar Libro</button>
            </form>
        </section>
    )
}

export default EditarLibro;