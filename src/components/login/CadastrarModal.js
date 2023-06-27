import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './loginComponent.css';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'Nome muito pequeno!')
    .max(50, 'nome muito longo! Tente apenas os primeiros nomes da empresa ou siglas')
    .required('O nome é obrigatorio'),
  cpf_cnpj: Yup.string()
    .min(11, 'O campo precisa ser um cpf ou um cnpj válido')
    .required('Esse campo é obrigatório'),
  email: Yup.string().email('Email invalido').required('O email é obrigatório'),
  senha: Yup.string()
    .required('Senha obrigatória')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'A senha precisa ter no mínimo 8 caracteres, ' +
      'uma letra maiúscula e uma letra minúscula, ' +
      'um número e um caracter especial'
    ),
  confirmandoSenha:
    Yup.string()
      .required('Confirme sua senha')
      .oneOf([Yup.ref('senha')], 'As senhas precisam ser iguais')
});

export const CadastrarModal = ({ mudar }) => {
  return (
    <div className="form_main">
      <p className="heading">Cadastrar-se</p>
      <Formik
        initialValues={{
          nome: '',
          cpf_cnpj: '',
          email: '',
          senha: '',
          telefone: '99999999',
          bairro: 'maria do carmo',
          rua: 'antonio',
          numero: '467',


        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          const valores = {
            nome: values.nome,
            cpf_cnpj: values.cpf_cnpj,
            email: values.email,
            senha: values.senha,
            telefone: values.telefone,
            bairro: values.bairro,
            rua: values.rua,
            numero: values.numero,
          }
          console.log(valores)
          axios.post(
            `http://localhost:3333/usuarios`,
            valores)
            .then(response => {
              console.log(response)
              localStorage.setItem('usuarioLogado', JSON.stringify(response));
            })
            .error(response =>{
              console.log(response)
            })
        }}
      >
        {({ errors, touched }) => (
          <Form >
            <div className="content_form_main">
              <Field name="nome" placeholder="Nome da empresa" className="inputField" />
              {errors.nome && touched.nome ? (
                <div className='errosYup'>{errors.nome}</div>
              ) : null}
              <Field name="cpf_cnpj" placeholder="CNPJ ou CPF" className="inputField" />
              {errors.cpf_cnpj && touched.cpf_cnpj ? (
                <div className='errosYup'>{errors.cpf_cnpj}</div>
              ) : null}
              <Field name="email" className="inputField" placeholder="Digite seu email" />
              {errors.email && touched.email ? (
                <div className='errosYup'>{errors.email}</div>
              ) : null}
              <Field name="senha" type="password" className="inputField" placeholder="Sua senha" />
              {errors.senha && touched.senha ? <div className='errosYup'>{errors.senha}</div> : null}
              <Field name='confirmandoSenha' type="password" className="inputField" placeholder="Confirme a senha" />
              {errors.confirmandoSenha && touched.confirmandoSenha ? <div className='errosYup'>{errors.confirmandoSenha}</div> : null}
            </div>
            <button type="submit" id="button">Cadastrar-se</button>

          </Form>
        )}
      </Formik>
      <div class="signupContainer">
        <p>Já tem conta?</p>
        <a onClick={mudar}>Entrar</a>
      </div>
    </div>
  )
}