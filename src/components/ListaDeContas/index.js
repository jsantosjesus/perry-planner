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
import api from '../../config/api';
import { useEffect } from 'react';

export const ListaDeContas = ({ clienteEmpresa, voltar }) => {
  console.log(clienteEmpresa)
    const contaEmAberto = clienteEmpresa.contas//.filter((conta) => conta.status === "aberta") 
    const valorTotal = contaEmAberto.map((conta) => (conta.totalSemJuros.toFixed(2).replace(".", ",")))
    const contas = clienteEmpresa.contas;
    const [pagamentoModal, setPagamentoModal] = useState(false)
    const [compraModal, setCompraModal] = useState(false)
    const [editarModal, setEditarModal] = useState(false)
    const [excluirModal, setExcluirModal] = useState(false)
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    
      contas.map((conta) => {
        api.get(`/movimentos/${conta.id}`, {headers: {'Authorization': usuarioLogado.token}}).
        then((response) =>{
          console.log(response)
          let linhas = document.getElementById(`movimento-${conta.id}`);
          linhas.innerHTML = "";
          response.data.map((movimento) =>{
            linhas.innerHTML+=`<Typography id='movimentosConta'>
            <p className='nomeMovimentosConta'>${movimento.tipo}</p><p className='dataMovimentosConta'>${movimento.createdAt}</p><p className='valorMovimentosConta'>${movimento.valor}</p>
          </Typography>`
          })
        })
      })
    

    return (
        <div className="bodyListaDeContas">
            <Menu titulo={clienteEmpresa.cliente.nome} funcaoEditar={() => setEditarModal(true)} funcaoExcluir={() => setExcluirModal(true)} voltar={voltar} />
            <div className="subMenuListaDeContas">
                <button className='botaoPagamento' onClick={() => setPagamentoModal(true)}>Cadastrar pagamento</button>
                <button onClick={() => setCompraModal(true)}>Cadastrar compra</button>
            </div>
            <div className='contentListaDeContas'>
                {contas.map((conta) => {
                  

                  const movimentoConta = `movimento-${conta.id}`;

                  return(
                    <Accordion>
                    <AccordionSummary
                      expandIcon={<AiFillCaretDown />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="tituloConta"><p className='mesTituloConta'>{conta.mes}</p><p className='statusTituloConta'>{conta.status}</p><p className='totalTituloConta'>R${conta.totalSemJuros.toFixed(2).replace(".", ",")}</p></Typography>
                    </AccordionSummary>
                    <AccordionDetails id={movimentoConta}>
                      
                    </AccordionDetails>
                  </Accordion>
                )})}
            </div>

            {pagamentoModal && <ModalPagamento fechar={() => setPagamentoModal(false)} dividaTotal={valorTotal} />}
            {compraModal && <ModalCompra fechar={() => setCompraModal(false)} />}
            {editarModal && <EditarCliente fechar={() => setEditarModal(false)} cliente={clienteEmpresa.cliente} />}
            {excluirModal && <ExcluirCliente cliente={clienteEmpresa.cliente} fechar={() => setExcluirModal(false)} />}
        </div>
    );
}