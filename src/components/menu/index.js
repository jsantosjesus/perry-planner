import React from 'react';
import logo from '../../assets/logo.png';
import '../../assets/logo.png';
import './menu.css'

export const Menu = ({titulo, icone1, icone2, funcao, home=false}) =>{
    return(
    <div className="bodyMenu">
        <div className="logoMenu">
            {home && <img className="logoMenu" src={logo} alt="PerryPlanner" width='250px' height='125px'/>}
            {!home && <><i src={icone1} /><i src={icone2} /></>}
            </div>
            <div className='tituloMenu'>
                <h1>{titulo}</h1>
            </div>
            <div>
             
            </div>

    </div>

)} 