import "./App.css";
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sobre from "./pages/sobre";
import Rank from "./components/Rate";
import Login from "./pages/Login";

function App() {
	return (
		<>

      <Rank descricao="Avaliação dos usuários"/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
		</>
	);
}

export default App;
