import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import api from '../../config/api';
import { ClienteNovoUser } from './clienteNovoUser';
import { ClienteUserExistente } from './clienteUserExistente';


const SignupSchema = Yup.object().shape({
  
  cpf_cnpj: Yup.string()
    .min(11, 'O campo precisa ser um cpf ou um cnpj válido')
    .required('Esse campo é obrigatório'),
});

export const AdicionarCliente = ({ fechar, carregandoClientes=()=>{} }) => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const [novoUser, setNovoUser] = useState(false);
  const [userExistente, setUserExistente] = useState(false);
  const [cpf, setCpf] = useState('');
  const [dadosUsuario, setDadosUsuario] = useState();
  const [carregando, setCarregando] =useState(false);

  return (
    <div className='envolveModal'>
        <div className="modal">
            <h3>Pesquise Usuário</h3>
           <Formik
                initialValues={{

                    cpf_cnpj: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    setCpf(values.cpf_cnpj)
                    setCarregando(true)
                    api.get(`usuarios/${values.cpf_cnpj}`, {headers: {'Authorization': usuarioLogado.token}}).
                    then((response) =>{
                        setUserExistente(true);
                        setNovoUser(false);
                        setDadosUsuario(response.data)
                        setCarregando(false);
                    }).
                    catch((err)=>{
                        if(err.response.data.message == "Usuário não existe."){
                          setNovoUser(true);
                          setUserExistente(false);
                          setCarregando(false) 
                        }
                        else{alert(err.response.data.message)}
                    })
                }}
            >
                {({ errors, touched }) => (
                    <Form >
                        <div className="content_form_main">
                            <Field name="cpf_cnpj" type="text" placeholder="Pesquise o usuario por cpf ou cnpj" />
                            {errors.cpf_cnpj && touched.cpf_cnpj ? (
                                <div className='errosYup'>{errors.cpf_cnpj}</div>
                            ) : null}
                        </div>
                        {!carregando ? <button className='botaoConfirmar' type="submit">Pesquisar</button> :
                        <button className='botaoConfirmar' style={{backgroundColor: "#818181"}}>Pesquisando...</button> }
                    </Form>
                )}
            </Formik> 
            {novoUser && <ClienteNovoUser CPF = {cpf} fechar={fechar} carregandoClientes={carregandoClientes}/>}
            {userExistente&& <ClienteUserExistente cliente = {dadosUsuario} fechar={fechar} carregandoClientes={carregandoClientes}/>}
            
            <button className='botaoFechar' onClick={fechar}>Fechar</button>
        </div>
    </div>
)
}