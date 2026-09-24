import "./App.css";
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sobre from "./pages/sobre";
import Formulario from "./pages/Formulario";
import Rank from "./components/Rate";

function App() {
	return (
		<>

      <Rank/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/formulario" element={<Formulario />} />
        </Routes>
      </BrowserRouter>
		</>
	);
}

export default App;
