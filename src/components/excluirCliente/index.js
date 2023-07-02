import React, {useState} from "react";
import api from "../../config/api";

export const ExcluirCliente = ({ fechar=()=>{}, cliente }) => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    const confirmarExcluir =  () =>{
        api.delete(`/usuarios/:${cliente.id}`, {headers: {'Authorization': usuarioLogado.token}}).
        then((response) =>{
            console.log(response)
            fechar();
        }).
        cacth((err) =>{
            console.log(err.response.data.message)
        })
    }
    return (
        <div className="envolveModal">
            <div className="modal">
                <h3>Tem certeza que quer excluir {cliente.nome}</h3>
                <button onClick={confirmarExcluir}>Sim</button>
                <button onClick={fechar}>Não</button>
            </div>

        </div>
    )
}