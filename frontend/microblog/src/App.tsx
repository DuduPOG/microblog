import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./components/BrFormCadastro";
import Publicacoes from "./pages/Publicacoes";
import ProtectedRoute from "./auth/ProtectedRoute";
import Comentarios from "./pages/Comentarios";
import PublicacaoDetalhe from "./components/BrPublicacaoDetalhe";
import NovaPublicação from "./pages/Publicacoes/insert-publicacoes";

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
          <Route path="/nova-publicacao" element={
            <ProtectedRoute>
              <NovaPublicação />
            </ProtectedRoute>
          } />
          <Route path="/publicacoes/:id" element={
            <ProtectedRoute>
              <PublicacaoDetalhe />
            </ProtectedRoute>
          } />
          <Route path="/comentarios/:id" element={<Comentarios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
		</>
	);
}

export default App;
