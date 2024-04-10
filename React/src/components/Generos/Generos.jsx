import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Generos.css'

function Generos() {

  const [generos, setGeneros] = useState([])

  useEffect(() => {
    fetch('http://localhost:5555/api/dataGeneros').then(res => res.json())
    .then(generosData => {
      setGeneros(generosData.data);
    })
    .catch(error => console.log(error));
  }, []);

  const eliminarGenero = (id) => {
    fetch(`http://localhost:5555/api/dataGeneros/borrar/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if(res.ok) {
        setGeneros(generos.filter(genero => genero.id !== id));
      }
    })
    .catch(error => console.error('Error al eliminar el libro:', error))
  }

  return (
    <div  className='div__generos'>
        <div>
            <h2>Generos</h2>
            <Link to={'/crearGenero'} className='boton__crearGenero'>Crear</Link>
        </div>
        <ul>
            {
            generos.map((genero, id) => (
                <li key={`genero${id}`}>
                    <p>Nombre: {genero.nombre}</p>
                    <button onClick={() => eliminarGenero(genero.id)}>Eliminar</button>
                </li>
            ))
            }
        </ul>
    </div>
  )
}

export default Generos
