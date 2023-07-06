import { useState } from 'react';
import { Menu } from '../menu/index';
import './listaDeContas.css';
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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export const ListaDeContas = ({ clienteEmpresa, voltar }) => {
  const contaEmAberto = clienteEmpresa.contas//.filter((conta) => conta.status === "aberta") 
  const valorTotal = contaEmAberto.map((conta) => (conta.totalSemJuros.toFixed(2).replace(".", ",")))
  const [contas, setContas] = useState(clienteEmpresa.contas);
  const [pagamentoModal, setPagamentoModal] = useState(false)
  const [compraModal, setCompraModal] = useState(false)
  const [editarModal, setEditarModal] = useState(false)
  const [excluirModal, setExcluirModal] = useState(false)
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const hoje = Date.parse(new Date());

  const adicionaZero = (numero) => {
    if (numero <= 9)
      return "0" + numero;
    else
      return numero;
  }


  const atualizarMovimentos = () => {
    // console.log("executou")
    // console.log(contas)
    contas.map((conta) => {
      // console.log("chamando get")
      api.get(`/movimentos/${conta.id}`, { headers: { 'Authorization': usuarioLogado.token } }).
        then((response) => {
          // console.log(response)
          let linhas = document.getElementById(`movimento-${conta.id}`);
          if (!linhas) {
            return;
          }
          linhas.innerHTML = "";
          conta.totalSemJuros = 0;
          response.data.map((movimento) => {
            let data = new Date(movimento.createdAt)
            let negativo;
            if (movimento.tipo === "PAGAMENTO") {
              negativo = "-"
              conta.totalSemJuros -= movimento.valor;
            }
            else {
              negativo = "+"
              conta.totalSemJuros += movimento.valor;
            }

            return (
              linhas.innerHTML += `<Typography id='movimentosConta'>
            <p id='nomeMovimentosConta'>${movimento.tipo}</p><p id='dataMovimentosConta'>${adicionaZero(data.getDate().toString())}/${adicionaZero(data.getMonth() + 1)}/${data.getFullYear()}</p><p id='valorMovimentosConta'>${negativo}R$${movimento.valor.toFixed(2).replace('.', ',')}</p>
          </Typography>`)
          })
          linhas.innerHTML += `<Typography id='movimentosConta'>
          <p id='nomeMovimentosConta'>TOTAL  (sem juros)</p><p id='dataMovimentosConta'></p><p id='valorMovimentosConta'>=R$${conta.totalSemJuros.toFixed(2).replace('.', ',')}</p>
        </Typography>`

          if (conta.juros > 0) {
            linhas.innerHTML += `<Typography id='movimentosConta'>
          <p id='nomeMovimentosConta'>JUROS</p><p id='dataMovimentosConta'></p><p id='valorMovimentosConta'>+R$${conta.juros.toFixed(2).replace('.', ',')}</p>
        </Typography>`
          }

          document.getElementById(`total-${conta.id}`).innerHTML = "R$ " + (conta.totalSemJuros + conta.juros).toFixed(2).replace(".", ",")
        })
    })
  }

  useEffect(() => {
    atualizarMovimentos();
  }, [])



  return (
    <div className="bodyListaDeContas">
      <Menu titulo={clienteEmpresa.cliente.nome} funcaoEditar={() => setEditarModal(true)} funcaoExcluir={() => setExcluirModal(true)} voltar={voltar} />
      <div className="subMenuListaDeContas">
        <button className='botaoPagamento' onClick={() => setPagamentoModal(true)}>Cadastrar pagamento</button>
        <button onClick={() => setCompraModal(true)}>Cadastrar compra</button>
      </div>
      <div className='contentListaDeContas'>
        {contas.map((conta) => {
          let total = conta.totalSemJuros + conta.juros;
          let dataFechamento = Date.parse(new Date(conta.dataFechamento));
          let situacao;
          if (conta.juros > 0 && conta.estaPaga === false) {
            situacao = "VENCIDA";
          }
          else if (dataFechamento > hoje) {
            situacao = "ABERTA"
          }
          else if (conta.estaPaga === true) {
            situacao = "PAGA"
          }
          else {
            situacao = "FECHADA"
          }

          const movimentoConta = `movimento-${conta.id}`;
          const totalConta = `total-${conta.id}`;

          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<AiFillCaretDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="tituloConta"><p className='mesTituloConta'>{conta.mesReferente}</p><p className='statusTituloConta'>{situacao}</p><p className='totalTituloConta' id={totalConta}></p></Typography>
              </AccordionSummary>
              <AccordionDetails id={movimentoConta}>
              </AccordionDetails>
            </Accordion>
          )
        })}

      </div>

      {pagamentoModal && <ModalPagamento fechar={() => setPagamentoModal(false)} dividaTotal={valorTotal} clienteId={clienteEmpresa.cliente.id} empresaId={usuarioLogado.id} autorizacao={usuarioLogado.token} atualizarMovimentos={atualizarMovimentos} />}
      {compraModal && <ModalCompra fechar={() => setCompraModal(false)} clienteId={clienteEmpresa.cliente.id} empresaId={usuarioLogado.id} autorizacao={usuarioLogado.token} atualizarMovimentos={atualizarMovimentos} contas={contas} />}
      {editarModal && <EditarCliente fechar={() => setEditarModal(false)} cliente={clienteEmpresa.cliente} autorizacao={usuarioLogado.token} />}
      {excluirModal && <ExcluirCliente cliente={clienteEmpresa.cliente} fechar={() => setExcluirModal(false)} />}

    </div>
  );
}