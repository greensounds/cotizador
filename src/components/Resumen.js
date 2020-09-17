import React from 'react';
import styled from '@emotion/styled';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838f;
    margin-top: 1rem;
    color: white;
    text-transform: capitalize;
`

const Resumen = ({ datos }) => {
    const { marca, year, plan } = datos;
    if(marca === '' || year === '' || plan === '' ) {
        return null
    }
    return (
        <ContenedorResumen>
            <h2>Resumen de Cotizacion</h2>
            <ul>
                <li>Marca: {marca}</li>
                <li>Año: {year}</li>
                <li>Plan: {plan}</li>
            </ul>
        </ContenedorResumen>
    );
};

export default Resumen;