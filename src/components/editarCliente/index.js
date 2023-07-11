import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import api from '../../config/api';

const SignupSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'Nome muito pequeno!')
    .max(50, 'nome muito longo! Tente apenas os primeiros nomes da empresa ou siglas')
    .required('O nome é obrigatorio'),
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

export const EditarCliente = ({ fechar=()=>{}, cliente, autorizacao, sucesso, erro }) => {

  const [carregando, setCarregando] = useState(false);

  return (
    <div className='envolveModal'>
      <div className="modal">
        <h3>Editar {cliente.nome}</h3>
        <Formik
          initialValues={{
            nome: cliente.nome,
            telefone: cliente.telefone,
            bairro: cliente.bairro,
            rua: cliente.rua,
            numero: cliente.numero,

          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            setCarregando(true)
            api.put(`usuarios/${cliente.id}`, values, {headers: {'Authorization': autorizacao}}).
            then((response) =>{
              setCarregando(false)
              fechar();
              sucesso("Cliente editado com sucesso!")
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
                <Field name="nome" placeholder="Nome do cliente" />
                {errors.nome && touched.nome ? (
                  <div className='errosYup'>{errors.nome}</div>
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
              {carregando && <button className='botaoConfirmar' style={{backgroundColor:"#818181"}}>Carregando...</button>}
              {!carregando && <button className='botaoConfirmar' type="submit">Editar</button>}

            </Form>
          )}
        </Formik>
        <button className='botaoFechar' onClick={fechar}>Fechar</button>
      </div>
    </div>
  )
}