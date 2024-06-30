var contador = 10;

function addDivida(evento) {
    var dados = new FormData(evento.target);

    var submit = evento.target
        .querySelector("button[type=submit]");

    var indice = Number(dados.get("index"));
    if (indice > -1) {
        var nodeTr = document
            .querySelector("tbody")
            .children
            .item(indice);

        var [id, valor, situacao, datacriacao, datapagamento, descricao] =
            nodeTr.children;
        id.innerHTML = dados.get("id");
        valor.innerHTML = dados.get("valor");
        situacao.innerHTML = dados.get("situacao");
        datacriacao.innerHTML = dados.get("datacriacao");
        datapagamento.innerHTML = dados.get("datapagamento");
        descricao.innerHTML = dados.get("descricao");
        evento.target.reset();
        evento.target
            .querySelector("input[type=hidden]")
            .value = "-1";

        var selected = nodeTr.closest("tbody").querySelector("tr.selected");
        selected?.classList.remove("selected");
    }
    else {

        submit.disabled = true;
        submit.innerHTML = "Enviando...";
        var linha = `
            <tr>
                <td>${contador++}</td>
                <td>${dados.get("valor")}</td>
                <td>${dados.get("situacao")}</td>
                <td>${dados.get("datacriacao")}</td>
                <td>${dados.get("datapagamento")}</td>
                <td>${dados.get("descricao")}</td>
            </tr>
            `;

        //DOM
        var tabela =
            document.getElementsByTagName("table")[0];

        var [body] = tabela
            .getElementsByTagName("tbody");

        console.log("ANTES DE INCLUIR");

        setTimeout(() => {
            body.innerHTML += linha;
            console.log("INCLUÍDO");
            submit.innerHTML = "Novo Divida";
            submit.disabled = false;
            evento.target.reset();
        }, 2000);

        console.log("DEPOIS DE INCLUIR");

        var funcaoNormal = function () {
            console.log("blablabla")
        }

        var arrowFunction = () => {
            console.log("blablabla")
        }

        var arrowFunctionUnica =
            () => console.log("blablabla")

    }
    evento.preventDefault();
    console.log("FINALIZADO");
}

function selecionar(evento) {

    var { target } = evento;
    var selected = target.closest("tbody").querySelector("tr.selected");
    selected?.classList.remove("selected");

    var nodeTR = target.closest("tr");
    nodeTR.classList.add("selected");

    var index = [...target
        .closest("tbody")
        .querySelectorAll("tr")
    ].indexOf(nodeTR);



    console.log(target, nodeTR, index);
    var [id, valor, situacao, datacriacao, datapagamento, descricao] =
        nodeTR.querySelectorAll("td");

    var form = document.querySelector("form");

    var campoID = form.querySelector("input[name=id]");
    var campoSituacao = form.querySelector("input[name=situacao]");
    var campoValor = form.querySelector("input[name=valor]");
    var campoDataCriacao = form.querySelector("input[name=datacriacao]");
    var campoDataPagamento = form.querySelector("input[name=datapagamento]");
    var campoDescricao = form.querySelector("textarea[name=descricao]");
    var campoIndice = form.querySelector("input[name=index]");

    campoID.value = id.innerText;
    campoSituacao.value = situacao.innerText;
    campoDataCriacao = datacriacao.innerText;
    campoDataPagamento = datapagamento.innerText;
    campoValor.value = valor.innerText;
    campoDescricao.value = descricao.innerText;
    campoIndice.value = index;
}