using VendinhaConsole.Entidades;
using VendinhaConsole.Dtos;
using VendinhaConsole.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Escola.Api.Controllers
{
    // /api/cliente
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteService clienteService;
        private readonly IWebHostEnvironment env;
        public ClienteController(ClienteService clienteService, IWebHostEnvironment env)
        {
            this.clienteService = clienteService;
            this.env = env;
        }

        [HttpGet]
        public IActionResult Listar(string pesquisa, int page = 0, int pageSize = 0)
        {
            // ternário
            var clientes = string.IsNullOrEmpty(pesquisa) ?
                clienteService.Listar(page, pageSize) :
                clienteService.Listar(pesquisa, page, pageSize);
            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            // ternário
            var cliente = clienteService.Retorna(id);
            return Ok(cliente);
        }

        [HttpPost]
        public IActionResult Criar([FromBody] Cliente cliente)
        {
            
            if (cliente == null)
            {
                return BadRequest(ModelState);
            }

            var sucesso = clienteService.Criar(cliente,
                out List<ValidationResult> erros);
            if (sucesso)
            {
                return Ok(cliente);
            }
            else
            {
                return UnprocessableEntity(erros);
            }
        }

        [HttpPut]
        public IActionResult Editar([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest(ModelState);
            }

            var sucesso = clienteService.Editar(cliente,
                out List<ValidationResult> erros);
            if (sucesso)
            {
                return Ok(cliente);
            }
            else if (erros.Count == 0)
            {
                return NotFound();
            }
            else
            {
                return UnprocessableEntity(erros);
            }
        }
        /*
         CRUD - Create/Recover/Update/Delete
         */
        // DELETE /api/cliente/{codigo}
        [HttpDelete("{codigo}")] // concatena com o Route
        public IActionResult Remover(int codigo)
        {
            var cliente = clienteService.Excluir(codigo, out _);
            if (cliente == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(cliente);
            }
        }

        [HttpGet("[action]")]
        public IActionResult Dividas()
        {
            // ternário
            var dvd = clienteService.ListarDividas();
            return Ok(dvd);
        }

        [HttpPost("[action]")]
        public IActionResult Endividar([FromBody] CriarDividaDto dados)
        {
            var dvd = new Endividar
            {
                Cliente = new Cliente { ID = dados.ClienteId },
                Divida = new Divida { Id = dados.DividaId },
            };
            return Ok();
        }

        [HttpPost]
[Route("api/dividas")]
public IActionResult CriarDivida([FromBody] Divida divida)
{
    if (divida == null)
    {
        return BadRequest("Dados da dívida não podem ser nulos");
    }

    // Verificação de campos obrigatórios
    if (divida.Valor == null || divida.Situacao == null || divida.DataCriacao == null || divida.Cliente == null)
    {
        return BadRequest("Campos obrigatórios não podem ser nulos");
    }

    try
    {
                return Ok(divida);   
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Erro interno: {ex.Message}");
    }
}

    }
}