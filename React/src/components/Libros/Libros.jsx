import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Libro from './Libro/Libro'
import './Libros.css'

function Libros() {
  const [libros, setLibros] = useState([])

  useEffect(() => {
    fetch('http://localhost:5555/api/dataLibros').then(res => res.json())
    .then(librosData => {
      setLibros(librosData.data);
    })
    .catch(error => console.log(error));
  }, []);

  const eliminarLibro = (id) => {
    fetch(`http://localhost:5555/api/dataLibros/borrar/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if(res.ok) {
        setLibros(libros.filter(libro => libro.id !== id));
      }
    })
    .catch(error => console.error('Error al eliminar el libro:', error))
  }

  return (
      <div className='div__libros'>
        <div className='div__Titilo_Boton'>
            <h2>Libros</h2>
            <Link to={'/crearLibro'} className='boton__crearLibro'>Crear</Link>
        </div>
        <ul className='contenedor__libros'>
            {
            libros.map((libro, id) => (
                <Libro key={`libro${id}`} libro={libro} eliminarLibro={eliminarLibro}/>
            ))
            }
        </ul>
      </div>
  )
}

export default Libros
