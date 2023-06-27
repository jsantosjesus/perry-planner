import { useState } from 'react';
import { Menu } from '../menu/index';
import './listaDeContas.css';
import { Contas } from '../../tables/conta';
import { ModalPagamento } from '../modalPagamento';
import { ModalCompra } from '../modalCompra';
import { EditarCliente } from '../editarCliente';
import { ExcluirCliente } from '../excluirCliente';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { AiFillCaretDown } from "react-icons/ai";

export const ListaDeContas = ({ cliente, voltar }) => {
    const contaEmAberto = Contas.filter((conta) => conta.status === "aberta")
    const valorTotal = contaEmAberto.map((conta) => (conta.total.toFixed(2).replace(".", ",")))
    const contas = Contas
    const [pagamentoModal, setPagamentoModal] = useState(false)
    const [compraModal, setCompraModal] = useState(false)
    const [editarModal, setEditarModal] = useState(false)
    const [excluirModal, setExcluirModal] = useState(false)

    return (
        <div className="bodyListaDeContas">
            <Menu titulo={cliente.nome} funcaoEditar={() => setEditarModal(true)} funcaoExcluir={() => setExcluirModal(true)} voltar={voltar} />
            <div className="subMenuListaDeContas">
                <button className='botaoPagamento' onClick={() => setPagamentoModal(true)}>Cadastrar pagamento</button>
                <button onClick={() => setCompraModal(true)}>Cadastrar compra</button>
            </div>
            <div className='contentListaDeContas'>
                {contas.map((conta) => (
                    <Accordion>
                    <AccordionSummary
                      expandIcon={<AiFillCaretDown />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="tituloConta"><p className='mesTituloConta'>{conta.mes}</p><p className='statusTituloConta'>{conta.status}</p><p className='totalTituloConta'>R${conta.total.toFixed(2).replace(".", ",")}</p></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography id='movimentosConta'>
                        <p className='nomeMovimentosConta'>Pagamento</p><p className='dataMovimentosConta'>25/05/2023</p><p className='valorMovimentosConta'>R$225,00</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>

            {pagamentoModal && <ModalPagamento fechar={() => setPagamentoModal(false)} dividaTotal={valorTotal} />}
            {compraModal && <ModalCompra fechar={() => setCompraModal(false)} />}
            {editarModal && <EditarCliente fechar={() => setEditarModal(false)} cliente={cliente} />}
            {excluirModal && <ExcluirCliente cliente={cliente} fechar={() => setExcluirModal(false)} />}
        </div>
    );
}