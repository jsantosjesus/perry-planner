import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './loginComponent.css';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('O email é obrigatório'),
  senha: Yup.string()
    .required('Senha obrigatória')
});

export const EntrarModal = ({ mudar }) => {
  return (
    <div className="form_main">
      <p className="heading">Entrar</p>
      <Formik
        initialValues={{
          email: '',
          senha: '',


        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
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
            <button type="submit" id="button">Entrar</button>

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