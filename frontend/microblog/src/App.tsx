import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./components/FormCadastro";
import Publicacoes from "./pages/Publicacoes";
import ProtectedRoute from "./auth/ProtectedRoute";
import Comentarios from "./pages/Comentarios";

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
          <Route path="/comentarios" element={<Comentarios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
		</>
	);
}

export default App;
