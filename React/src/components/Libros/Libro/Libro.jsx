import React from "react";
import './Libro.css'
import { Link } from "react-router-dom";

function Libro({ libro, eliminarLibro }) {

    return(
        <li className="contenedor__libro" key={`libro${libro.id}`}>
            <p className="nombre">{libro.nombre}</p>
            <p className="genero">Genero: {libro.Genero.nombre}</p>
            <img src={libro.imagen} alt="" />
            <div className="botones">
                <button onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
                <Link className="button" to={'/actualizar/' + libro.id}>Editar</Link>
            </div>
        </li>
    )
}

export default Libro;