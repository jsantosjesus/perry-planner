import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './loginComponent.css';
import axios from 'axios';
import api from '../../config/api';
import { Context } from '../../Context/AuthContext';

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
      .oneOf([Yup.ref('senha')], 'As senhas precisam ser iguais'),
  telefone:
    Yup.string()
      .min(3, 'numero muito pequeno!')
      .max(50, 'numero muito longo!')
      .required('telefone é obrigatorio'),
  bairro:
    Yup.string()
      .min(3, 'nome muito pequeno!')
      .max(50, 'nome muito longo!')
      .required('Bairro é obrigatorio'),
  rua:
    Yup.string()
      .min(3, 'nome muito pequeno!')
      .max(50, 'nome muito longo!')
      .required('Rua é obrigatorio'),
  numero:
    Yup.string()
      .max(10, 'numero muito longo!')
      .required('numero da casa é obrigatorio')
});

export const CadastrarModal = ({ mudar }) => {
  const { authenticated, handleLogin } = useContext(Context);
  const [carregando, setCarregando] = useState(false)

  return (
    <div className="form_main">
      <p className="heading">Cadastrar-se</p>
      <Formik
        initialValues={{
          nome: '',
          cpf_cnpj: '',
          email: '',
          senha: '',
          telefone: '',
          bairro: '',
          rua: '',
          numero: '',


        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          setCarregando(true);
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

          api.post(
            `/usuarios`,
            valores)
            .then(response => {
              console.log(response)
              setCarregando(false)
              localStorage.setItem('usuarioLogado', JSON.stringify(response));
              handleLogin();
              api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

            })
            .error(response => {
              setCarregando(false);
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
              <Field name="telefone" placeholder="Digite seu telefone" className="inputField" />
              {errors.telefone && touched.telefone ? (
                <div className='errosYup'>{errors.telefone}</div>
              ) : null}
              <Field name="bairro" placeholder="Seu bairro" className="inputField" />
              {errors.bairro && touched.bairro ? (
                <div className='errosYup'>{errors.bairro}</div>
              ) : null}
              <Field name="rua" placeholder="Sua rua" className="inputField" />
              {errors.rua && touched.rua ? (
                <div className='errosYup'>{errors.rua}</div>
              ) : null}
              <Field name="numero" placeholder="o numero da casa" className="inputField" />
              {errors.numero && touched.numero ? (
                <div className='errosYup'>{errors.numero}</div>
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
            {!carregando && <button type="submit" id="button">Cadastre-se</button>}
            {carregando && <button id="button">carregando...</button>}

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