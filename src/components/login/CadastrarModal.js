import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 import './loginComponent.css';
 
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

export const CadastrarModal = ({fechar}) =>{
    return(
        <div className="bodyEntrarModal">
     <h1>Signup</h1>
     <Formik
       initialValues={{
         nome: '',
         cpf_cnpj: '',
         email: '',
         senha: '',
         confirmandoSenha: '',
         

       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
           <Field name="nome" />
           {errors.nome && touched.nome ? (
             <div className='errosYup'>{errors.nome}</div>
           ) : null}<br />
           <Field name="cpf_cnpj" />
           {errors.cpf_cnpj && touched.cpf_cnpj ? (
             <div className='errosYup'>{errors.cpf_cnpj}</div>
           ) : null}<br />
           <Field name="email" />
           {errors.email && touched.email ? (
             <div className='errosYup'>{errors.email}</div>
           ) : null}<br />
           <Field name="senha" type="password" />
           {errors.senha && touched.senha ? <div className='errosYup'>{errors.senha}</div> : null}<br />
           <Field name="confirmandoSenha" type="password" />
           {errors.confirmandoSenha && touched.confirmandoSenha ? <div className='errosYup'>{errors.confirmandoSenha}</div> : null}<br />
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
            <button onClick={fechar}>Fechar</button>
        </div>
    )
}