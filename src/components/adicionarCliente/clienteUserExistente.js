import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import api from '../../config/api';

const SignupSchema = Yup.object().shape({

    diaVencimento: Yup.number()
        .required('Data do vencimento é obrigatoria')
        .max(30, 'Precisa ser uma data do mês')
});

export const ClienteUserExistente = ({ cliente, fechar=()=>{}, carregandoClientes=()=>{}, sucesso, erro}) => {
    const [carregando, setCarregando] = useState(false);
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    return (
        <div>
            <h3>Usuário Existente</h3>
            <Formik
                initialValues={{
                    diaVencimento: ''                    
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    const valores = {
                        nome: cliente.nome,
                        cpf_cnpj: cliente.cpf_cnpj,
                        diaVencimento: values.diaVencimento,
                        telefone: cliente.telefone,
                        bairro: cliente.bairro,
                        rua: cliente.rua,
                        numero: cliente.numero,
                        empresaId: usuarioLogado.id
                    }
                    setCarregando(true);
                    api.post(("/clientes"), valores, {headers: {'Authorization': usuarioLogado.token}}).
                    then((response) =>{
                        setCarregando(false);
                        sucesso("Cliente adicionado com sucesso!");
                        carregandoClientes();
                        fechar();
                        
                    }).
                    cacth((err) =>{
                        setCarregando(false);
                        console.log(err.response.data.message) 
                        erro()  
                    })

                }}
            >
                {({ errors, touched }) => (
                    <Form >
                        <div className="content_form_main">
                            <p>Nome: {cliente.nome}</p>
                            <p>CPF: {cliente.cpf_cnpj}</p>
                            <p>Telefone: {cliente.telefone}</p>
                            <p>Bairro: {cliente.bairro}</p>
                            <p>Rua: {cliente.rua}</p>
                            <p>Numero: {cliente.numero}</p>
                            <Field name="diaVencimento" type="number" placeholder="Melhor data para vencimento" />
                            {errors.diaVencimento && touched.diaVencimento ? (
                                <div className='errosYup'>{errors.diaVencimento}</div>
                            ) : null}
                        </div>
                        {!carregando ? <button className='botaoConfirmar' type="submit">Cadastrar cliente</button> :
                            <button className='botaoConfirmar' style={{ backgroundColor: "#818181" }}>Cadastrando...</button>}

                    </Form>
                )}
            </Formik>
        </div>

    )
}