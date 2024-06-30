import { useEffect, useState } from "react";
import { getById, listarDividas } from "../services/DividaAPI";
import FormDivida from "./FormDividas";

const SITUACAO = [
    "Paga",
    "Não Paga"
]

export default function L() {

    var [dividas, setDividas] = useState([]);

    var [divida, setDivida] = useState();

    const [busca, setBusca] = useState("");

    useEffect(() => {
        listarDividas(busca)
            .then(resposta => {
                if (resposta.status == 200) {
                    resposta.json()
                        .then(dividas => {
                            setDividas(dividas);
                        })
                }
            });
    }, [busca]);

    const getDivida = async (id) => {
        var result = await getById(id);
        if (result.status == 200) {
            var dados = await result.json();
            setDivida(dados);
        }
    }

    return (<>
        <h1>Dividas</h1>
        <div className="row">
            <input type="search" value={busca}
                onChange={(e) => setBusca(e.target.value)} />
            <button type="button" onClick={() => setDivida({})}>Novo Divida</button>
        </div>

        <table id="table-dividas">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Valor</th>
                    <th>Situação</th>
                    <th>Data de Criação</th>
                    <th>Data de Pagamento</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
                {dividas.map(divida =>
                    <tr onClick={() => getDivida(divida.id)} key={divida.id}>
                        <td>{divida.id}</td>
                        <td>{divida.Valor}</td>
                        <td>{SITUACAO[divida.situacao]}</td>
                        <td>{divida.criacao}</td>
                        <td>{divida.pagamento}</td>
                        <td>{divida.descricao}</td>
                    </tr>
                )}
            </tbody>
        </table>
        {divida && <FormDivida
            divida={divida}
            onClose={() => setDivida(undefined)}
        ></FormDivida>}
    </>)
}