import React from "react";

export const ExcluirCliente = ({ fechar, cliente }) => {
    return (
        <div className="envolveModal">
            <div className="modal">
                <h3>Tem certeza que quer excluir {cliente.nome}</h3>
                <button>Sim</button>
                <button onClick={fechar}>Não</button>
            </div>

        </div>
    )
}