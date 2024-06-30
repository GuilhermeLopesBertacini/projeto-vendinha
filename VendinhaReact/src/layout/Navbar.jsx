import { Link } from "simple-react-routing";

function Navbar() {
    return (<nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/clientes/criar">Novo cliente</Link></li>
            <li><Link to="/dividas">Dívidas</Link></li>
        </ul>
    </nav>)
};

export default Navbar;