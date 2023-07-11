import React, { useEffect, useState } from "react"
import { Menu } from '../../components/menu'
import './home.css';
import { ListaDeContas } from "../../components/ListaDeContas";
import { AdicionarCliente } from "../../components/adicionarCliente";
import api from "../../config/api";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SairModal } from "../../components/sairModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Home = () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const user = usuarioLogado.nome;
    const id = usuarioLogado.id;
    const [arrayDeClientes, setArrayDeClientes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [sairModal, setSairModal] = useState(false);

    const sucesso = (menssagem) => {toast.success(menssagem, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })}

        const erro = () => {toast.error("Aconteceu um erro", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })}


    const carregandoClientes = () => {
        api.get(`/clientes/${id}`, { headers: { 'Authorization': usuarioLogado.token } }).
            then((response) => {
                if (!response) return;
                setArrayDeClientes(response.data)
                setClientesPesquisados(response.data)
                setCarregando(false)
            }).
            catch(response => {
                alert("Erro ao carregar a lista de clientes," + response)
                setCarregando(false)
            })
    }

    useEffect(() => {
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
            <Menu titulo={user} home={true} abrirSairModal={() => { setSairModal(true) }} />
            <div className="subMenu">
                <div className="pesquisa">
                    <input type="text" placeholder="Pesquise por nome, CPF ou CNPJ" onChange={(e) => setValorDaPesquisa(e.target.value)} />
                </div>
                <div className="adicionarCliente">
                    <button className="botaoAdicionar" onClick={() => setAdicionarModal(true)}>Adicionar cliente</button>
                </div>
            </div>
            <div className="tituloListaClientes">
                <p><b>Nome</b></p><p><b>CPF</b></p>
            </div>
            {!carregando && !paginaDoCliente && <div className="listaClientes">
                {clientesPesquisados.map((clienteEmpresa) => (
                    <div onClick={() => abrindoContasModal(clienteEmpresa)}>
                        <p>{clienteEmpresa.cliente.nome}</p>
                        <p>{clienteEmpresa.cliente.cpf_cnpj}</p>
                    </div>
                ))}
            </div>
            }
            {carregando &&
                <Box sx={{ display: 'flex' }} id="divCarregando">
                    <CircularProgress />
                </Box>}

            {arrayDeClientes.length === 0 && !carregando &&
                <div className="semClientes">
                    <p>Você ainda nâo tem nenhum cliente cadastrado</p>
                    <button onClick={() => setAdicionarModal(true)}>Adicionar cliente</button>
                </div>
            }
            {paginaDoCliente && <ListaDeContas clienteEmpresa={paginaDoCliente} voltar={() => setPaginaDoCliente(null)} />}
            {adicionarModal && <AdicionarCliente fechar={() => setAdicionarModal(false)} autorizacao={usuarioLogado.token} carregandoClientes={carregandoClientes} sucesso={sucesso} erro={erro} />}
            {sairModal && <SairModal fechar={() => { setSairModal(false) }} />}
            <ToastContainer />

        </div>
    )
}