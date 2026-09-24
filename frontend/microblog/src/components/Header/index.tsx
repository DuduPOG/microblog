import { Link } from "react-router-dom";

function Header() {
    return (
    <>
      <header className="br-header compact">
        <div className="container-sm">
          <div>
            <div className="br-list">
              <div className="header cols-2">
                <Link to="/home" className="br-item" >Home</Link>
                <Link to="/sobre" className="br-item">Sobre</Link>
                <Link to="/formulario" className="br-item" >Formulário</Link> 
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
    )
}

export default Header;