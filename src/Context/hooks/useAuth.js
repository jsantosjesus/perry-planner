import { useState, useEffect } from 'react';

import api from '../../config/api';
import history from '../../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(usuarioLogado)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  function handleLogin() {
    setAuthenticated(true);
    history.push('/');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('usuarioLogado');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }
  
  return { authenticated, loading, handleLogin, handleLogout };
}