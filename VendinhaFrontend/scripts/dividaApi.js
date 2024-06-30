const URL_API = "http://localhost:5268"; // URL do meu back

function listarDividas() {
    // PROMISE
    var response = fetch(URL_API + "/api/divida")
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

function preencherTabela() {
    var tabela = document.getElementById("table-dividas");
    listarDividas().then((resultado) => {
        if (resultado.status == 200) {
            resultado.json().then(
                dividas => {
                    var tbody = tabela.querySelector("tbody");
                    dividas.forEach(divida => {
                        tbody.innerHTML += `<tr>
                            <td>${divida.id}</td>
                            <td>${divida.valor}</td>
                            <td>${divida.situacao}</td>
                            <td>${divida.datacriacao}</td>
                            <td>${divida.datapagamento}</td>
                            <td>${divida.descricao}</td>
                        </tr>`
                    });
                }
            )
        }
    })
}

async function criarDivida(divida) {
    const response = await fetch('/api/dividas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(divida)
    });
    return response;
}

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const divida = {
        valor: form.valor.value,
        situacao: form.situacao.value,
        dataCriacao: form.dataCriacao.value,
        dataPagamento: form.dataPagamento.value || null,
        descricao: form.descricao.value || null,
        clienteId: form.clienteId.value
    };

    criarDivida(divida)
        .then(response => {
            if (response.status === 200) {
                alert('Dívida criada com sucesso!');
            } else {
                return response.json().then(error => {
                    throw new Error(JSON.stringify(error));
                });
            }
        })
        .catch(error => {
            console.error('Erro ao criar dívida:', error);
            alert('Erro ao criar dívida: ' + error.message);
        });
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
