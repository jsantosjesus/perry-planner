import React, {useState} from "react";
import api from "../../config/api";

export const ExcluirCliente = ({ fechar=()=>{}, clienteEmpresa }) => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    console.log("id: " + clienteEmpresa.id)
    
    const confirmarExcluir =  () =>{
        api.delete(`/clientes/:${clienteEmpresa.id}`, {headers: {'Authorization': usuarioLogado.token}}).
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
                <h3>Tem certeza que quer excluir {clienteEmpresa.cliente.nome}</h3>
                <button className='botaoSimNao' onClick={confirmarExcluir}>Sim</button>
                <button className='botaoSimNao' onClick={fechar}>Não</button>
            </div>

        </div>
    )
}