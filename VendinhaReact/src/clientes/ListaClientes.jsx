import { useEffect, useState } from "react";
import { listarClientes } from "../services/clienteAPI";
import { Link } from "simple-react-routing";

export default function ListaClientes(properties) {
    const [lista, setLista] = useState([]);
    const [busca, setBusca] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        listarClientes(busca, page, 8)
            .then(resposta => {
                if (resposta.status === 200) {
                    resposta.json()
                        .then(clientes => {
                            setLista(clientes);
                        });
                }
            });
    }, [busca, page]);

    return (
        <>
            <h1>Lista de clientes</h1>
            <div className="row">
                <input
                    type="search"
                    style={{ minWidth: 250 }}
                    value={busca}
                    onChange={(event) => setBusca(event.target.value)}
                />
                <Link to="/clientes/criar">Novo Cliente</Link>
            </div>

            <div className="grid" id="grid-clientes">
                {lista.map(cliente => (
                    <ClienteItem key={cliente.id} cliente={cliente} />
                ))}
            </div>
            <div className="row">
                <button type="button" onClick={() => setPage(page - 1)}>Anterior</button>
                <span>{page}</span>
                <button type="button" onClick={() => setPage(page + 1)}>Próximo</button>
            </div>
        </>
    );
}

function ClienteItem({ cliente }) {
    var data = new Date(cliente.dataNascimento);
    var dia = data.getDate().toString().padStart(2, '0');
    var mes = (data.getMonth() + 1).toString().padStart(2, '0');
    var ano = data.getFullYear();

    return (
        <div className="card">
            <ul>
                <li>ID: {cliente.id}</li>
                <li>Nome: {cliente.nome}</li>
                <li>CPF: {cliente.cpf}</li>
                <li>Data de Nascimento: {dia}/{mes}/{ano}</li>
                <li>E-mail: {cliente.email}</li>
                <li>Endividamentos: {cliente.endividamentos.length}</li>
            </ul>
            <div className="acoes">
                <Link to={"/clientes/editar/" + cliente.id}>Editar</Link>
                <button type="button">Excluir</button>
            </div>
        </div>
    );
}
