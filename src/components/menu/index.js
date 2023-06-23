import React from 'react';
import logo from '../../assets/logo.png';
import '../../assets/logo.png';
import './menu.css'

export const Menu = ({titulo, icone, funcao}) =>{
    return(
    <div className="bodyMenu">
        <div className="logoMenu">
            <img className="logoMenu" src={logo} alt="PerryPlanner" width='250px' height='125px'/>
            </div>
            <div className='tituloMenu'>
                <h1>{titulo}</h1>
            </div>
            <div className='iconeMenu'>
             
            </div>

    </div>

)} 