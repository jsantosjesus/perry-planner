import './modalPagamento.css';

export const ModalPagamento = ({dividaTotal, ultimaFatura, fechar}) =>{
    return(
        <div className='envolveModal'>
            <div className='modal'>
                <p>Dívida total:{dividaTotal}</p>
                <p>Última fatura:{ultimaFatura}</p>
                <input type='number' placeholder='Valor do pagamento' />
                <button onClick={fechar}>fechar</button>
            </div>
        </div>
    )
}