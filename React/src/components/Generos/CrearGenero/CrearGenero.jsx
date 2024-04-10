import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearGenero() {

    const [nombre, setNombre] = useState('');
    const navegacion = useNavigate()

    const inputCambios = (event) => {
        setNombre(event.target.value);
    };

    const crearGenero = (event) => {
        event.preventDefault()

        const nuevoLibro = {
            nombre: nombre
        }

        fetch('http://localhost:5555/api/dataGeneros/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoLibro)
        })
        .then(res => {
            if(res.ok) {
                navegacion("/generos")
                console.log('Genero creado con exito')
            } else {
                throw new Error('Error al crear el genero')
            }
        })
        .catch(error => {
            console.error('Error al crear el genero:', error)
        })
        
    }

    return (
        <section className="">
            <form onSubmit={crearGenero}>
                <div className="nombre">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={inputCambios}
                    />
                </div>

                <button type="submit">Crear Genero</button>
            </form>
        </section>
    )
}

export default CrearGenero;