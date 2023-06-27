import './modalCompra.css';
import '../../styleGlobal/global.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  valor: Yup.number('Você precisa digitar um valor').positive('Não pode ser negativo').required('Você precisa digitar um valor')
});

export const ModalCompra = ({ fechar }) => {
  return (
    <div className='envolveModal'>
      <div className='modal'>
        <h3>Cadastre uma compra</h3>
        <Formik
          initialValues={{
            valor: null,


          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form >
              <Field name='valor' type='number' placeholder='Valor da compra' />
              {errors.valor && touched.valor ? (
                <div className='errosYup'>{errors.valor}</div>
              ) : null}
              <button className="botaoConfirmar" type="submit">Confirmar</button>
            </Form>
          )}
        </Formik>

        <button className='botaoFechar' onClick={fechar}>fechar</button>
      </div>
    </div>
  )
}