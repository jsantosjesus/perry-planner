import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignupSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'Nome muito pequeno!')
    .max(50, 'nome muito longo! Tente apenas os primeiros nomes da empresa ou siglas')
    .required('O nome é obrigatorio'),
  cpf_cnpj: Yup.string()
    .min(11, 'O campo precisa ser um cpf ou um cnpj válido')
    .required('Esse campo é obrigatório'),
  telefone: Yup.string().matches(phoneRegExp, 'O número do telefone não é válido'),
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

export const AdicionarCliente = ({ fechar }) => {
  return (
    <div className='envolveModal'>
      <div className="modal">
        <h3>Adicionar novo cliente</h3>
        <Formik
          initialValues={{
            nome: '',
            cpf_cnpj: '',
            telefone: '',
            bairro: '',
            rua: '',
            numero: '',



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
                <Field name="nome" placeholder="Nome do cliente" />
                {errors.nome && touched.nome ? (
                  <div className='errosYup'>{errors.nome}</div>
                ) : null}
                <Field name="cpf_cnpj" type="text" placeholder="CNPJ ou CPF" />
                {errors.cpf_cnpj && touched.cpf_cnpj ? (
                  <div className='errosYup'>{errors.cpf_cnpj}</div>
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
              <button className='botaoConfirmar' type="submit">Cadastrar cliente</button>

            </Form>
          )}
        </Formik>
        <button className='botaoFechar' onClick={fechar}>Fechar</button>
      </div>
    </div>
  )
}