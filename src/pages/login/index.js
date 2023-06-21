import './login.css'
import logo from '../../assets/logo.png'
import { useState } from 'react';
import {EntrarModal} from '../../components/login/EntrarModal'
import { CadastrarModal } from '../../components/login/CadastrarModal';

export const Login = () => {
    const [modalEntrar, setModalEntrar] = useState(false)
    const [modalCadastrar, setModalCadastrar] = useState(false)

    return(
        <div className="bodyLogin">
            <img className="logoLogin" src={logo} alt="PerryPlanner" width='250px' height='125px'/>
            <div className='contentLogin'>
                <h2>
                Automatize seu fiado
                </h2>
                <div className='buttonsLogin'>
                    <button onClick={() => setModalEntrar(true)}>Entrar</button>
                    <button onClick={() => setModalCadastrar(true)}>Cadastre-se</button>
                </div>
            </div>
            {modalEntrar && <EntrarModal fechar={() => setModalEntrar(false)}/>}
            {modalCadastrar && <CadastrarModal fechar={() =>  setModalCadastrar(false)}/>}
        </div>
    );
}