import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sobre from "./pages/sobre";
import Login from "./pages/Login";
import Cadastro from "./components/FormCadastro";
import Publicacoes from "./pages/Home";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
	return (
		<>
      <BrowserRouter>
        <Routes>
          <Route path="/publicacoes" element={
            <ProtectedRoute>
              <Publicacoes />
            </ProtectedRoute>
          } />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
		</>
	);
}

export default App;
