import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPagina] = useState(1);
  const [totalpaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    if(busqueda === '') return;

    const callAPI = async () => {

      const imagenesPorPagina = 30;
      const key = '16315240-54b405ddc945f3aa70df9fac4';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const imagenes = await respuesta.json();

      setImagenes(imagenes.hits);

      //Calcular el total de paginas.
      const calcularTotalPaginas = Math.ceil(imagenes.totalHits / imagenesPorPagina); 

      setTotalPaginas(calcularTotalPaginas);

      //Mover la pantalla hasta arriba.

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    callAPI();

  }, [busqueda, paginaactual])

  const paginaAnterior = () => {

    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;

    setPagina(nuevaPaginaActual);

  }

  const paginaSiguiente = () => {

    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    setPagina(nuevaPaginaActual);

  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de imágenes
        </p>

        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

      {(paginaactual === 1) ? 
      
        null
       : 
        <button
          type="button"
          className="bbtn btn-info mr-5"
          onClick={paginaAnterior}
        > &laquo; Anterior  </button>}

        {(totalpaginas === paginaactual) ? null
        
        :
        
        <button
          type="button"
          className="bbtn btn-info"
          onClick={paginaSiguiente}
        > Siguiente &raquo;</button>
      
        }



      </div>
    </div>
  );
}

export default App;
