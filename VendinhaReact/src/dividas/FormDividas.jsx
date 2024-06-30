import { useState } from "react";
import { postDivida } from "../services/DividaAPI";

export default function FormDivida({
    divida,
    onClose
}) {
    const [errorMessage, setErrorMessage] = useState();

    const salvarDivida = async (evento) => {
        evento.preventDefault();
        var dados = new FormData(evento.target);
        var dividaDados = {
            id: divida.id,
            situacao: Number(dados.get("situacao")),
            criacao: Date(dados.get("criacao")),
            pagamento: Date(dados.get("pagamento")),
            descricao: dados.get("descricao")
        };

        var result = await postDivida(dividaDados);
        if (result.status == 200) {
            onClose();
        }
        else {
            var error = await result.json();
            setErrorMessage("Houve erro ao salvar divida: \n" + JSON.stringify(error, null, '\t'))
        }
    };

    return (
        <div className="modal">
            <form onSubmit={salvarDivida}>
                <div className="formulario">
            <div className="input">
                <label>ID do cliente:</label>
                <input type="number" placeholder="ID do Cliente" name="idcliente" />
                <span class="error"></span>

                <label>Situação:</label>
                        <select name="situacao" defaultValue={divida.situacao}>
                <option value="0">Não Paga</option>
                <option value="1">Paga</option>
            </select>
            </div>
                    <div className="row">
                        <div className="input">
                            <label>Valor da dívida:</label>
                            <input defaultValue={divida.valor} placeholder="Valor da divida" type="text" name="nome" />
                            <span className="error"></span>
                        </div>
                        
                        <div className="input">
                            <label>Data de Criação:</label>
                            <input defaultValue={divida.criacao} type="date" placeholder="dd/mm/yyyy" name="duracao" />
                            <span className="error"></span>
                        </div>
                    </div>
                    <div className="input">
                        <label>Data de pagamento:</label>
                        <input placeholder="DataPagamento" type="date" name="DataPagamento"/>
                        <span className="error"></span>
                    </div>
                    <div className="input">
                        <label>Descrição:</label>
                        <textarea defaultValue={divida.descricao} placeholder="Descrição da dívida" name="descricao"></textarea>
                        <span className="error"></span>
                    </div>
                    <p className="error">{errorMessage}</p>
                </div>
                <div className="acoes">
                    <button type="reset" onClick={onClose}>Cancelar</button>
                    <button type="submit">Novo Divida</button>
                </div>
            </form>
        </div>)
}