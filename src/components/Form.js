import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`

const Label = styled.label`
    flex: 0 0 100px;
`

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`

const InputRadio = styled.input`
    margin: 0 1rem;
`

const Boton = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover {
        cursor: pointer;
        background-color: #26c6da;
    }
`

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`

const Form = ({ guardarResumen, guardarCargando }) => {
    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [error, guardarError] = useState(false);

    //Leer datos del form y actualizar el state
    const obtenerDatos = (e) => {
        e.preventDefault();
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    //extraer los valores del state
    const { marca, year, plan } = datos;

    const cotizarSeguro = (e) => {
        e.preventDefault();
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        //Base de 2000
        let resultado = 2000;

        //obtener diferencia de anios
        const diferencia = obtenerDiferenciaYear(year);
        //por cda anio hay restar 3%
        resultado -= (( diferencia * 3) * resultado) / 100;
        //americano 15%
        //asiatico 5%
        //europeo 30%
        resultado = calcularMarca(marca) * resultado;
        //basico aumenta 20%
        //completo 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
        //total
        guardarCargando(true);

        setTimeout(() => {
            guardarCargando(false);
            guardarResumen({
                cotizacion: resultado,
                datos
            })
        }, 3000)
    }

    return (
        <form
            onSubmit={cotizarSeguro}
            >
            { error ?  <Error>Todos los campos son obligatorios</Error> : null }
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerDatos}
                >
                    <option value="">--Seleccione una opcion</option>
                    <option value="americano">Americano</option>
                    <option value="asiatico">Asiatico</option>
                    <option value="europeo">Europeo</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerDatos}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerDatos}
                />Basico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerDatos}
                />Completo
            </Campo>
            <Boton value="submit">Cotizar</Boton>
        </form>
    );
};

export default Form;