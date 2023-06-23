import React, { useEffect, useState } from "react"
import { Menu } from '../../components/menu'
import './home.css'
import { Clientes } from "../../tables/clientes"

export const Home = () => {
    const arrayDeClientes = Clientes
    const [paginaDoCliente, setPaginaDoCliente] = useState(null);

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
            <Menu titulo="Establecimento" />
            <div className="subMenu">
                <input type="text" placeholder="Pesquise por nome, CPF ou CNPJ" onChange={(e) => setValorDaPesquisa(e.target.value)} />
                <p>{clientesPesquisados.map((cliente) => (
                    <div onClick={() => teste(cliente)}>
                        <p>{cliente.nome}</p>
                    </div>
                ))}</p>
            </div>
            <div className="listaClientes">
                {paginaDoCliente && <p>{paginaDoCliente.nome}</p>}
            </div>
        </div>
    )
}