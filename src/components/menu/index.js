import React from 'react';
import logo from '../../assets/logo.png';
import '../../assets/logo.png';
import './menu.css';
import { AiOutlineForm } from "react-icons/ai";

export const Menu = ({titulo, icone1, icone2, funcaoEditar, home=false}) =>{
    return(
    <div className="bodyMenu">
        <div className="logoMenu">
            {home && <img className="logoMenu" src={logo} alt="PerryPlanner" width='250px' height='125px'/>}
            {!home && <><p onClick={funcaoEditar}><AiOutlineForm /></p><i src={icone2} /></>}
            </div>
            <div className='tituloMenu'>
                <h1>{titulo}</h1>
            </div>
            <div>
             
            </div>

    </div>

)} 