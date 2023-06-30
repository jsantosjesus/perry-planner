import './login.css'
import { useState } from 'react';
import {EntrarModal} from '../../components/login/EntrarModal';
import { CadastrarModal } from '../../components/login/CadastrarModal';
import React from 'react';

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
            {modalEntrar && <EntrarModal mudar={abrirCadastrar}/>}
            {modalCadastrar && <CadastrarModal mudar={abrirEntrar}/>}
        </div>
    );
}