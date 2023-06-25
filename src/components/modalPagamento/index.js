import './modalPagamento.css';
import '../../styleGlobal/global.css'
import React from 'react';
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';

 const SignupSchema = Yup.object().shape({
    valor: Yup.number('Você precisa digitar um valor').positive('Não pode ser negativo').required('Você precisa digitar um valor')
  });

export const ModalPagamento = ({dividaTotal, ultimaFatura, fechar}) =>{
    return(
        <div className='envolveModal'>
            <div className='modal'>
                <h3>Cadastrar pagamento</h3>
                <p>Dívida total: R${dividaTotal}</p>
                <p>Última fatura: {ultimaFatura}</p>
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
                <Field name='valor' type='number' placeholder='Valor do pagamento' />
                {errors.valor && touched.valor ? (
             <div className='errosYup'>{errors.valor}</div>
           ) : null}
                <button type="submit">Confirmar</button>
                </Form>
       )}
     </Formik>

                <button onClick={fechar}>fechar</button>
            </div>
        </div>
    )
}