import React, { useState } from 'react';
import Header from './components/Header';
import styled from '@emotion/styled';
import Form from './components/Form'
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const ContenedorFormulario = styled.div`
  background-color: #fff;
  padding: 3rem;
`

function App() {
  const [resumen, guardarResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  })

  const { cotizacion, datos } = resumen;

  const [cargando, guardarCargando] = useState(false);
  return (
    <Contenedor>
      <Header titulo='Cotizador'  />
      <ContenedorFormulario>
        <Form 
          guardarResumen={guardarResumen}
          guardarCargando= {guardarCargando}
        />
        {cargando ?  <Spinner /> : null}
         {!cargando ?  
          <Resumen 
            datos={datos}
         />
        : null}
        {!cargando ?  
           <Resultado 
           cotizacion={cotizacion}
         />
        : null}

      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
