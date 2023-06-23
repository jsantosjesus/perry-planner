import { useState } from 'react';
import {Menu} from '../menu/index';
import './listaDeContas.css';
import { Contas } from '../../tables/conta';
import { ModalPagamento } from '../modalPagamento';

export const ListaDeContas = ({cliente}) =>{
    const contaEmAberto = Contas.filter((conta) => conta.status === "aberta")
    const contas = Contas
    const [pagamentoModal, setPagamentoModal] = useState(false)
    const [compraModal, setCompraModal] = useState(false)
    return(
    <div className="bodyListaDeContas">
        <Menu titulo={cliente.nome} />
        <div className="subMenu">
            <div>

            </div>
            <div>
                <button onClick={() => setPagamentoModal(true)}>Pagar</button>
                <button onClick={() => setCompraModal(true)}>Cadastrar compra</button>
            </div>
        </div>
        <div className='content'>
            {contas.map((conta) =>(
                <div>
                    <p>{conta.mes}</p>
                    <p>{conta.total}</p>
                </div>
            ))}
        </div>

        {pagamentoModal && <ModalPagamento fechar={() => setPagamentoModal(false)} dividaTotal={contaEmAberto.total} />}
        {compraModal && <p onClick={() => setCompraModal(false)}>compra</p>}
    </div>
    );
}