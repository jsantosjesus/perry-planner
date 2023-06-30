import React, { useEffect, useState } from "react"
import { Menu } from '../../components/menu'
import './home.css';
import { Clientes } from "../../tables/clientes"
import { ListaDeContas } from "../../components/ListaDeContas";
import { AdicionarCliente } from "../../components/adicionarCliente";


export const Home = () => {
    const arrayDeClientes = Clientes
    const [paginaDoCliente, setPaginaDoCliente] = useState(null);
    const [adicionarModal, setAdicionarModal] = useState(false);

    const [valorDaPesquisa, setValorDaPesquisa] = useState('')
    const [clientesPesquisados, setClientesPesquisados] = useState(arrayDeClientes)

    const filtrandoPorPesquisa = () => {
        let resultado = arrayDeClientes

        if (valorDaPesquisa) {
            resultado = arrayDeClientes.filter((cliente) => {
                return cliente.nome.toLowerCase().includes(valorDaPesquisa.toLowerCase()) ||
                    cliente.cpf.toLowerCase().includes(valorDaPesquisa.toLowerCase());
            })
        }

        setClientesPesquisados(resultado)
    }

    useEffect(() => {
        filtrandoPorPesquisa();
    }, [valorDaPesquisa])

    const teste = (cliente) => {
        setPaginaDoCliente(cliente)
    }

    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const user = JSON.parse(usuarioLogado).data.nome;
    const id = JSON.parse(usuarioLogado).data.id;

    return (
        <div className="bodyHome">

            <Menu titulo={user} home={true} />
            <div className="subMenu">
                <div className="pesquisa">
                    <input type="text" placeholder="Pesquise por nome, CPF ou CNPJ" onChange={(e) => setValorDaPesquisa(e.target.value)} />
                </div>
                <div className="adicionarCliente">
                    <button className="showDesktop" onClick={() => setAdicionarModal(true)}>Adicionar cliente</button>
                    <button className="showMobile" onClick={() => setAdicionarModal(true)}>  +  </button>
                </div>
            </div>
            <div className="tituloListaClientes">
                <p><b>Nome</b></p><p><b>CPF</b></p>
            </div>
            <div className="listaClientes">
                {clientesPesquisados.map((cliente) => (
                    <div onClick={() => teste(cliente)}>
                        <p>{cliente.nome}</p>
                    </div>
                ))}
            </div>
            {paginaDoCliente && <ListaDeContas cliente={paginaDoCliente} voltar={() => setPaginaDoCliente(null)} />}
            {adicionarModal && <AdicionarCliente fechar={() => setAdicionarModal(false)} />}

        </div>
    )
}