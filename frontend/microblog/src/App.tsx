import "./App.css";
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sobre from "./pages/sobre";
import Login from "./pages/Login";
import Cadastro from "./components/FormCadastro";

function App() {
	return (
		<>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
		</>
	);
}

export default App;
