const URL_API = "http://localhost:5268";

function listarClientes() {
    // PROMISE
    var response = fetch(URL_API + "/api/cliente")
    return response;
}

function deletarCliente(id) {
    // PROMISE
    var request = {
        method: "DELETE"
    }
    var response = fetch(URL_API + "/api/cliente/" + id, request)
    return response;
}

function postDivida(divida) {
    // PROMISE
    var request = {
        method: divida.id ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(divida)
    }
    var response =
        fetch(URL_API + "/api/divida",
            request)
    return response;
}

async function excluirCliente(id) {
    const confirmou = await confirmar("Deseja confirmar a exclusão do cliente?");
    if (confirmou){
        await deletarCliente(id);
        var grid = document.getElementById("grid-clientes");
        grid.innerHTML = "";
        carregarClientes();
    }
    console.log("RETORNO DA PROMISE::::::", confirmou);
}

function confirmar(texto) {
    var confirm = document.createElement("div");
    confirm.classList.add("dialog");

    confirm.innerHTML = `<div class="content">
        <p>${texto}</p>
        <div class="acoes"></div>
        </div>
    `;

    var confirmButton = document.createElement("button");
    var declineButton = document.createElement("button");
    confirmButton.innerHTML = "Confirmar";
    declineButton.innerHTML = "Recusar";
    var acoes = confirm.querySelector(".acoes");

    acoes.appendChild(confirmButton);
    acoes.appendChild(declineButton);

    document.body.appendChild(confirm);

    return new Promise((funcaoThen) => {
        confirmButton.addEventListener("click", () => {
            document.body.removeChild(confirm);
            funcaoThen(true)
        });
        declineButton.addEventListener("click", () => {
            document.body.removeChild(confirm);
            funcaoThen(false)
        });
    });
}

async function carregarClientes() {
    var resultado = await listarClientes();
    if (resultado.status == 200) {
        var clientes = await resultado.json();
        var grid = document.getElementById("grid-clientes");
        clientes.forEach(cliente => {
            var data = new Date(cliente.dataNascimento);
            var dia = data.getDate().toString().padStart(2, '0');
            var mes = (data.getMonth() + 1).toString().padStart(2, '0');
            var ano = data.getFullYear();
            grid.innerHTML += `<div class="card">
                            <ul>
                                <li>ID: ${cliente.id}</li>
                                <li>Nome: ${cliente.nome}</li>
                                <li>CPF: ${cliente.cpf}
                                <li>Data de Nascimento: ${dia}/${mes}/${ano}</li>
                                <li>E-mail: ${cliente.email}</li>
                            </ul>
                            <div class="acoes">
                                <button type="button">Editar</button>
                                <button type="button" onclick="excluirCliente(${cliente.id})">Excluir</button>
                            </div>
                        </div>`;
        });
    }
}

function criarDivida(event) {
    event.preventDefault();
    var dados = new FormData(event.target);
    var form = event.target;
    var objDivida = {
        nome: dados.get("nome"),
        nivel: Number(dados.get("nivel")),
        duracao: Number(dados.get("duracao")),
        descricao: dados.get("descricao"),
    }

    postDivida(objDivida)
        .then(resultado => {
            if (resultado.status == 200) {
                var tabela = document
                    .getElementById("table-dividas")
                    .querySelector("tbody");
                tabela.innerHTML = "";
                preencherTabela();
            }
            else if (resultado.status == 422) {
                resultado.json().then(erros => {
                    erros.forEach(erro => {
                        const { memberNames, errorMessage } = erro;
                        const [campo] = memberNames;
                        const input = form.querySelector(`[name=${campo.toLowerCase()}]`);
                        const erroMessage = input.parentNode.querySelector(".error")
                        erroMessage.innerHTML = errorMessage;
                    })
                })
            }
        });

}