import './modalPagamento.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import api from '../../config/api';

const SignupSchema = Yup.object().shape({
  valor: Yup.number('Você precisa digitar um valor').positive('Não pode ser negativo').required('Você precisa digitar um valor')
});

export const ModalPagamento = ({ dividaTotal, totalFechadas, fechar = () =>{}, autorizacao, clienteId, empresaId, atualizarMovimentos, sucesso, erro }) => {
  const [carregando, setCarregando] = useState(false);
  return (
    <div className='envolveModal'>
      <div className='modal'>
        <h3>Cadastrar pagamento</h3>
        <p>Dívida total: R$ {dividaTotal.toFixed(2).replace(".", ",")}</p>
        <p>Última fatura: R$ {totalFechadas.toFixed(2).replace(".", ",")}</p>
        <Formik
          initialValues={{
            valor: null,
            descricao: ""


          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            const parametros = {
              clienteId: clienteId,
              empresaId: empresaId,
              valor: values.valor,
              tipo: "PAGAMENTO",
              descricao: values.descricao
            }
            setCarregando(true)
            api.post("/movimentos", parametros, {headers: {'Authorization': autorizacao}}).
            then((response)=>{
              console.log(response)
              setCarregando(false)
              atualizarMovimentos();
              fechar();
              sucesso("Pagamento cadastrado!")
            }
            ).
            cacth((err) =>{
              setCarregando(false);
              console.log(err.response.data.message) 
              erro()  
          })
          }}
        >
          {({ errors, touched }) => (
            <Form >
              <Field name='valor' type='number' placeholder='Valor do pagamento' />
              {errors.valor && touched.valor ? (
                <div className='errosYup'>{errors.valor}</div>
              ) : null}
              <Field name='descricao' type='text' placeholder='Descricao' />
              {!carregando && <button className="botaoConfirmar" type="submit">Confirmar</button>}
              {carregando && <button className="botaoConfirmar" style={{backgroundColor: "#818181"}}>Carregando...</button>}
            </Form>
          )}
        </Formik>

        <button onClick={fechar} className="botaoFechar">fechar</button>
      </div>
    </div>
  )
}