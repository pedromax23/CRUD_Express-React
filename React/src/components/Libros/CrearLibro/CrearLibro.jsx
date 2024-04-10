import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

function CrearLibro() {

    const [generos, setGeneros] = useState([]);
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState(1);
    const [foto, setFoto] = useState('');
    const navegacion = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5555/api/dataGeneros').then(res => res.json())
        .then(dataGeneros => {
            setGeneros(dataGeneros.data)
        })
    }, [])

    const inputCambios = (event) => {
        setNombre(event.target.value);
    };

    const crearLibro = (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('imagen', foto);
        formData.append('genero_id', genero)

        fetch('http://localhost:5555/api/dataLibros/crear', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if(res.ok) {
                navegacion("/libros")
                console.log('Libro creado con exito')
            } else {
                throw new Error('Error al crear el libro')
            }
        })
        .catch(error => {
            console.error('Error al crear el libro:', error)
        })   
    }

    return (
        <section className="">
            <form onSubmit={crearLibro}>
                <div className="nombre">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={inputCambios}
                    />
                </div>

                <div className="foto">
                    <label htmlFor="foto"></label>
                    <input type="file" id="foto" onChange={(event) => setFoto(event.target.files[0])}/>
                </div>

                <div className="generos">
                    <label htmlFor="genero">Elije un genero</label>
                    <select id="genero" onChange={(event) => setGenero(event.target.value)}>
                    {
                        generos.map((genero, id) => (
                            <option key={'genero'+id} value={genero.id}>{genero.nombre}</option>
                        ))
                    }
                    </select>
                </div>

                <button type="submit">Crear Libro</button>
            </form>
        </section>
    )
}

export default CrearLibro;