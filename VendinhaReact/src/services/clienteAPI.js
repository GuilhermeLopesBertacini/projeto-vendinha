const URL_API = "http://localhost:5268"; // URL do meu back

export function listarClientes(pesquisa, page, pageSize) {
    var data = page == 0 ? "" : `page=${page}&pageSize=${pageSize}`;
    // PROMISE
    var response = pesquisa ?
    fetch(URL_API + "/api/cliente?pesquisa=" + pesquisa + "&" + data) :
    fetch(URL_API + "/api/cliente?" + data);

    return response;
}

export function getById(id) {
    // PROMISE
    var response = fetch(URL_API + "/api/cliente/" + id);
    return response;
}

export function deletarCliente(id) {
    // PROMISE
    var request = {
        method: "DELETE"
    }
    var response = fetch(URL_API + "/api/cliente/" + id, request)
    return response;
}

export function postCliente(cliente) {
    // PROMISE
    var request = {
        method: cliente.id ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    }
    var response =
        fetch(URL_API + "/api/cliente",
            request)
    return response;
}