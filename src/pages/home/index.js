import React, { useEffect, useState } from "react"
import { Menu } from '../../components/menu'
import './home.css';
import { Clientes } from "../../tables/clientes"
import { ListaDeContas } from "../../components/ListaDeContas";
import { AdicionarCliente } from "../../components/adicionarCliente";
import api from "../../config/api";


export const Home = () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const user = usuarioLogado.nome;
    const id = usuarioLogado.id;
    const [arrayDeClientes, setArrayDeClientes] = useState([]);
    console.log(usuarioLogado.token)

    
        const carregandoClientes = () =>{api.get(`/clientes/${id}`, {headers: {'Authorization': usuarioLogado.token}}).
            then((response) => { 
                if(!response)return;
                console.log(response.data)
                setArrayDeClientes(response.data)
                setClientesPesquisados(response.data)
            
            }).
            catch(response => alert("Erro ao carregar a lista de clientes," + response))}
  
            useEffect(() =>{
                carregandoClientes();
            }, [])
           

    const [paginaDoCliente, setPaginaDoCliente] = useState(null);
    const [adicionarModal, setAdicionarModal] = useState(false);

    const [valorDaPesquisa, setValorDaPesquisa] = useState('')
    const [clientesPesquisados, setClientesPesquisados] = useState(arrayDeClientes)

    const filtrandoPorPesquisa = () => {
        let resultado = arrayDeClientes

        if (valorDaPesquisa) {
            resultado = arrayDeClientes.filter((clienteEmpresa) => {
                return clienteEmpresa.cliente.nome.toLowerCase().includes(valorDaPesquisa.toLowerCase()) ||
                    clienteEmpresa.cliente.cpf_cnpj.toLowerCase().includes(valorDaPesquisa.toLowerCase());
            })
        }

        setClientesPesquisados(resultado)
    }

    useEffect(() => {
        filtrandoPorPesquisa();
    }, [valorDaPesquisa])

    const abrindoContasModal = (cliente) => {
        setPaginaDoCliente(cliente)
    }

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
                {clientesPesquisados.map((clienteEmpresa) => (
                    <div onClick={() => abrindoContasModal(clienteEmpresa)}>
                        <p>{clienteEmpresa.cliente.nome}</p>
                        <p>{clienteEmpresa.cliente.cpf_cnpj}</p>
                    </div>
                ))}
            </div>
            {paginaDoCliente && <ListaDeContas clienteEmpresa={paginaDoCliente} voltar={() => setPaginaDoCliente(null)} />}
            {adicionarModal && <AdicionarCliente fechar={() => setAdicionarModal(false)} />}

        </div>
    )
}