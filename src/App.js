import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';


function App() {

  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if(busqueda === '') return;

    const callAPI = async () => {

      const imagenesPorPagina = 30;
      const key = '16315240-54b405ddc945f3aa70df9fac4';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      const respuesta = await fetch(url);
      const imagenes = await respuesta.json();
      setBusqueda(busqueda);
    }
    callAPI();

  }, [busqueda])


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de imagenes
        </p>

        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
    </div>
  );
}

export default App;
