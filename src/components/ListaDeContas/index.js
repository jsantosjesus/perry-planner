import { useState } from 'react';
import {Menu} from '../menu/index';
import './listaDeContas.css';
import { Contas } from '../../tables/conta';
import { ModalPagamento } from '../modalPagamento';
import { ModalCompra } from '../modalCompra';
import { EditarCliente } from '../editarCliente';
import { ExcluirCliente } from '../excluirCliente';

export const ListaDeContas = ({cliente, voltar}) =>{
    const contaEmAberto = Contas.filter((conta) => conta.status === "aberta")
    const valorTotal = contaEmAberto.map((conta) => (conta.total.toFixed(2).replace(".", ",")))
    const contas = Contas
    const [pagamentoModal, setPagamentoModal] = useState(false)
    const [compraModal, setCompraModal] = useState(false)
    const [editarModal, setEditarModal] = useState(false)
    const [excluirModal, setExcluirModal] = useState(false)

    return(
    <div className="bodyListaDeContas">
        <Menu titulo={cliente.nome} funcaoEditar={() => setEditarModal(true)} funcaoExcluir={() => setExcluirModal(true)} voltar={voltar}/>
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

        {pagamentoModal && <ModalPagamento fechar={() => setPagamentoModal(false)} dividaTotal={valorTotal} />}
        {compraModal && <ModalCompra fechar={() => setCompraModal(false)} />}
        {editarModal && <EditarCliente fechar={() => setEditarModal(false)} cliente={cliente} />}
        {excluirModal && <ExcluirCliente cliente={cliente} fechar={() => setExcluirModal(false)}/>}
    </div>
    );
}