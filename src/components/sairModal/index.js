import React, {useState, useContext} from "react";
import api from "../../config/api";
import { Context } from '../../Context/AuthContext';

export const SairModal = ({ fechar=()=>{} }) => {
   
    const {handleLogout } = useContext(Context);
    
    
    return (
        <div className="envolveModal">
            <div className="modal">
                <h3>Tem certeza que quer sair?</h3>
                <button className='botaoSimNao' onClick={handleLogout}>Sim</button>
                <button className='botaoSimNao' onClick={fechar}>Não</button>
            </div>

        </div>
    )
}