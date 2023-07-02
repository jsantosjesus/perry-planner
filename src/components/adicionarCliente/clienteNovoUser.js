import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import api from '../../config/api';

const SignupSchema = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'Nome muito pequeno!')
        .max(50, 'nome muito longo! Tente apenas os primeiros nomes da empresa ou siglas')
        .required('O nome é obrigatorio'),
    cpf_cnpj: Yup.string()
        .min(11, 'O campo precisa ser um cpf ou um cnpj válido')
        .required('Esse campo é obrigatório'),
    diaVencimento: Yup.number()
        .required('Data do vencimento é obrigatoria')
        .max(30, 'Precisa ser uma data do mês'),
    telefone: Yup.string().
        min(3, 'Numero de celular muito pequeno').
        max(50, 'Numero de celular muito grande'),
    bairro: Yup.string()
        .min(3, 'Nome do bairro é muito pequeno')
        .max(50, 'Nome do bairro é muito grande'),
    rua: Yup.string()
        .min(3, 'Nome da rua é muito pequeno')
        .max(50, 'Nome da rua é muito grande'),
    numero: Yup.string()
        .min(1, 'Número muito pequeno')
        .max(10, 'Número muito grande')
});

export const ClienteNovoUser = ({ CPF, fechar=()=>{} }) => {
    const [carregando, setCarregando] =useState(false);
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    return (
        <div>
            <h3>Cadastrar novo cliente</h3>
            <Formik
                initialValues={{
                    nome: '',
                    cpf_cnpj: CPF,
                    diaVencimento: '',
                    telefone: '',
                    bairro: '',
                    rua: '',
                    numero: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    const valores ={
                        nome: values.nome,
                        cpf_cnpj: values.cpf_cnpj,
                        diaVencimento: values.diaVencimento,
                        telefone: values.telefone,
                        bairro: values.bairro,
                        rua: values.rua,
                        numero: values.numero,
                        empresaId: usuarioLogado.id
                    }
                    setCarregando(true);
                    api.post(("/clientes"), valores, {headers: {'Authorization': usuarioLogado.token}}).
                    then((response) =>{
                        console.log(response)
                        setCarregando(false);
                        fechar(); 
                    }).
                    cacth((err) =>{
                        setCarregando(false);
                        alert(err.response.data.message)   
                    })
                }}
            >
                {({ errors, touched }) => (
                    <Form >
                        <div className="content_form_main">
                            <Field name="nome" placeholder="Nome do cliente" />
                            {errors.nome && touched.nome ? (
                                <div className='errosYup'>{errors.nome}</div>
                            ) : null}
                            <p>CPF: {CPF}</p>
                            <Field name="diaVencimento" type="number" placeholder="Melhor data para vencimento" />
                            {errors.diaVencimento && touched.diaVencimento ? (
                                <div className='errosYup'>{errors.diaVencimento}</div>
                            ) : null}
                            <Field name="telefone" placeholder="Digite o telefone" />
                            {errors.telefone && touched.telefone ? (
                                <div className='errosYup'>{errors.telefone}</div>
                            ) : null}
                            <Field name="bairro" type="text" placeholder="Digite o nome do bairro" />
                            {errors.bairro && touched.bairro ? <div className='errosYup'>{errors.bairro}</div> : null}
                            <Field name="rua" type="text" placeholder="Digite o nome da rua" />
                            {errors.rua && touched.rua ? <div className='errosYup'>{errors.rua}</div> : null}
                            <Field name="numero" type="text" placeholder="Digite o numero da casa" />
                            {errors.numero && touched.numero ? <div className='errosYup'>{errors.numero}</div> : null}
                        </div>
                        {!carregando ? <button className='botaoConfirmar' type="submit">Cadastrar cliente</button> :
                        <button className='botaoConfirmar' style={{backgroundColor: "#818181"}}>Cadastrando...</button> }

                    </Form>
                )}
            </Formik>
        </div>

    )
}