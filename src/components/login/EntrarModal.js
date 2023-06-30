import React, {useContext, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './loginComponent.css';
import axios from 'axios';
import api, { baseUrl } from '../../config/api';
import { Context } from '../../Context/AuthContext';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('O email é obrigatório'),
  senha: Yup.string()
    .required('Senha obrigatória')
});

export const EntrarModal = ({ mudar }) => {
  const { authenticated, handleLogin } = useContext(Context);
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false)

  return (
    <div className="form_main">
      <p className="heading">Entrar</p>
      {erro && <p className='erro'>usuário e senha invalidos</p>}
      <Formik
        initialValues={{
          email: '',
          senha: '',


        }}
        validationSchema={SignupSchema}
        onSubmit={async values => {
          console.log(values);
          setCarregando(true);
          setErro(false);
          await api.post(
            `https://perry-planner.onrender.com/usuarios/login`,
            values)
            .then(response => {
              console.log(response);
              setCarregando(false);
              localStorage.setItem('usuarioLogado', JSON.stringify(response));
              handleLogin();
            })
            .catch(response => {
              console.log("erro");
              setErro(true);
              setCarregando(false);
            }) 
        }}
      >
        {({ errors, touched }) => (
          <Form >
            <div className="content_form_main">
              <Field name="email" className="inputField" placeholder="Digite seu email" />
              {errors.email && touched.email ? (
                <div className='errosYup'>{errors.email}</div>
              ) : null}
              <Field name="senha" type="password" className="inputField" placeholder="Sua senha" />
              {errors.senha && touched.senha ? <div className='errosYup'>{errors.senha}</div> : null}
            </div>
            {!carregando && <button type="submit" id="button">Entrar</button>}
            {carregando && <button id="button">carregando...</button>}

          </Form>
        )}
      </Formik>
      <div class="signupContainer">
        <p>Ainda não possui conta?</p>
        <a onClick={mudar}>Cadastre-se</a>
      </div>
      
    </div>
  )
}