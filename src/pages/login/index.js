import './login.css'
import logo from '../../assets/logo.png'
import { useState } from 'react';
import {EntrarModal} from '../../components/login/EntrarModal'
import { CadastrarModal } from '../../components/login/CadastrarModal';

export const Login = () => {
    const [modalEntrar, setModalEntrar] = useState(true)
    const [modalCadastrar, setModalCadastrar] = useState(false)

    const abrirCadastrar = () => {
        setModalEntrar(false)
        setModalCadastrar(true)
    }
    const abrirEntrar = () => {
        setModalEntrar(true)
        setModalCadastrar(false)
    }

    return(
        <div className="bodyLogin">
            <img className="logoLogin" src={logo} alt="PerryPlanner" width='250px' height='125px'/>
            {modalEntrar && <EntrarModal mudar={abrirCadastrar}/>}
            {modalCadastrar && <CadastrarModal mudar={abrirEntrar}/>}
        </div>
    );
}