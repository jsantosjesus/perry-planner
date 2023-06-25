import React, { useEffect, useState } from "react"
import { Menu } from '../../components/menu'
import './home.css'
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
            resultado = arrayDeClientes.filter((cliente) =>
                cliente.nome.toLowerCase().includes(valorDaPesquisa.toLowerCase()))
        }
        console.log(resultado)

        setClientesPesquisados(resultado)
    }

    useEffect(() => {
        filtrandoPorPesquisa();
    }, [valorDaPesquisa])

    const teste = (cliente) =>{
        setPaginaDoCliente(cliente)
    }


    return (
        <div className="bodyHome">
            <Menu titulo="Establecimento" home={true}/>
            <div className="subMenu">
                <input type="text" placeholder="Pesquise por nome, CPF ou CNPJ" onChange={(e) => setValorDaPesquisa(e.target.value)} />
                <button onClick={() => setAdicionarModal(true)}>Adicionar cliente</button>
            </div>
            <div className="listaClientes">
            <p>{clientesPesquisados.map((cliente) => (
                    <div onClick={() => teste(cliente)}>
                        <p>{cliente.nome}</p>
                    </div>
                ))}</p>
                {paginaDoCliente && <ListaDeContas cliente={paginaDoCliente} voltar={() => setPaginaDoCliente(null)} />}
                {adicionarModal && <AdicionarCliente fechar={() => setAdicionarModal(false)} />}
            </div>
        </div>
    )
}