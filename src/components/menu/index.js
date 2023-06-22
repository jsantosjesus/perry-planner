import logo from '../../assets/logo.png';
import '../../assets/logo.png';

export const Menu = ({titulo, icone, funcao}) =>{
    <div className="bodyMenu">
        <div className="logoMenu">
            <img className="logoMenu" src={logo} alt="PerryPlanner" width='250px' height='125px'/>
            </div>
            <div className='tituloMenu'>
                <h1>{titulo}</h1>
            </div>
            <div className='iconeMenu'>
                
            </div>

    </div>
} 