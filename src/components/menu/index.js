import React from 'react';
import logo from '../../assets/logo.png';
import '../../assets/logo.png';
import './menu.css';
import { AiOutlineForm, AiOutlineDelete, AiOutlineLeft } from "react-icons/ai";
import {BsBoxArrowInRight} from "react-icons/bs";


export const Menu = ({ titulo, icone1, icone2, funcaoEditar, funcaoExcluir, voltar, home = false }) => {
    return (
        <div className="bodyMenu">
            <div className="logoMenu">

                {home && <img className="showDesktop" src={logo} alt="PerryPlanner" />}
                {!home && <p onClick={voltar}><AiOutlineLeft /></p>}
            </div>
            <div className='tituloMenu'>
                <h1>{titulo}</h1>
            </div>
            <div className='iconesControleMenu'>
                {!home && <><p onClick={funcaoEditar}><AiOutlineForm /></p><p onClick={funcaoExcluir}><AiOutlineDelete /></p></>}
                {home && <p alt="Sair"><BsBoxArrowInRight /></p>}
            </div>

        </div>

    )
} 