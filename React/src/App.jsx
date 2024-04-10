import Libros from './components/Libros/Libros'
import Generos from './components/Generos/Generos'
import Inicio from './components/Inicio'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import CrearLibro from './components/Libros/CrearLibro/CrearLibro'
import CrearGenero from './components/Generos/CrearGenero/CrearGenero'
import EditarLibro from './components/Libros/EditarLibro/EditarLibro'

function App() {
  

  return (
    <>
      <header>
        <ul>
          <li><Link to={'/'}>Inicio</Link></li>
          <li><Link to={'/libros'}>Libros</Link></li>
          <li><Link to={'/generos'}>Generos</Link></li>
        </ul>
      </header>

      <section>
        <Routes>
          <Route path='/' element={<Inicio />}/>
          <Route path='/libros' element={<Libros />}/>
          <Route path='/generos' element={<Generos />}/>
          <Route path='/crearLibro' element={<CrearLibro />}/>
          <Route path='/crearGenero' element={<CrearGenero />}/>
          <Route path='/actualizar/:id' element={<EditarLibro />}/>
        </Routes>
      </section>
    </>
  )
}

export default App
