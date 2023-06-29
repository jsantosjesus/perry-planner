import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import Routes from './routes';
import history from './history';

import { AuthProvider } from './Context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes history={history}>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
