import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { useEffect, useState } from "react";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export const Auth = () =>{
  let objetoJson = localStorage.getItem('usuarioLogado');
  let objeto = JSON.parse(objetoJson)
  const [token, setToken] = useState('')

  const passandoToken = () =>{
    setToken(objeto.token)
  }

}

export default App;