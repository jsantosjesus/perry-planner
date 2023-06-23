import { useState } from 'react';
import {Menu} from '../menu/index';
import './listaDeContas.css';
import { Contas } from '../../tables/conta';

export const ListaDeContas = ({cliente}) =>{
    const contas = Contas
    const [pagamentoModal, setPagamentoModal] = useState(false)
    const [compra, setCompraModal] = useState(false)
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
    </div>
    );
}