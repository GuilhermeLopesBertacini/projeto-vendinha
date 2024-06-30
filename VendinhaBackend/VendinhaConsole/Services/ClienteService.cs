using System.ComponentModel.DataAnnotations;
using NHibernate;
using VendinhaConsole.Entidades;
using System.Drawing.Printing;

namespace VendinhaConsole.Services
{
    public class ClienteService
    {

        private readonly ISessionFactory session;

        public ClienteService(ISessionFactory session)
        {
            this.session = session;
        }

        public bool Criar(Cliente cliente, out List<ValidationResult> erros)
        {
            if (Validacao(cliente, out erros))
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();

                // Verifique se o CPF já existe no banco de dados
                var clienteExistente = sessao.Query<Cliente>()
                                             .FirstOrDefault(c => c.CPF == cliente.CPF);

                if (clienteExistente != null)
                {
                    erros.Add(new ValidationResult("Já existe um cliente com esse CPF.",
                                                   new[] { "CPF" }));
                    return false;
                }

                try
                {
                    sessao.Save(cliente);
                    transaction.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    // Lidar com o erro ou logar detalhes do erro, se necessário
                    throw new Exception("Erro ao salvar cliente.", ex);
                }
            }
            return false;
        }


        public bool Editar(Cliente Cliente, out List<ValidationResult> erros)
        {
            if (Validacao(Cliente, out erros))
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Merge(Cliente);
                transaction.Commit();
                return true;
            }
            return false;
        }

        public Cliente Excluir(int id, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            using var sessao = session.OpenSession();
            using var transaction = sessao.BeginTransaction();
            var Cliente = sessao.Query<Cliente>()
                .Where(c => c.ID == id)
                .FirstOrDefault();
            if (Cliente == null)
            {
                erros.Add(new ValidationResult("Registro não encontrado",
                    new[] { "id" }));
                return null;
            }
            var dividas = sessao.Query<Divida>().Where(d => d.Cliente.ID == id).ToList();
            foreach (var divida in dividas)
            {
                sessao.Delete(divida);
            }

            sessao.Delete(Cliente);
            transaction.Commit();
            return Cliente;
        }

        public virtual List<Cliente> Listar(int page, int pageSize)
        {
            using var sessao = session.OpenSession();
            var Clientes = page == 0 ? sessao.Query<Cliente>().OrderByDescending(c => c.ID).ToList():
                sessao.Query<Cliente>()
                .OrderByDescending(c => c.ID)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return Clientes;
        }
        public List<Endividar> ListarEndividamentos()
        {
            using var sessao = session.OpenSession();
            var dvd = sessao.Query<Endividar>()
                .OrderBy(c => c.Id)
                .ToList();
            return dvd;
        }

        public virtual List<Cliente> Listar(string busca, int page, int pageSize)
        {
            using var sessao = session.OpenSession();
            var Clientes = sessao.Query<Cliente>()
                .Where(c => c.Nome.Contains(busca) ||
                            c.Email.Contains(busca))
                .OrderBy(c => c.ID)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return Clientes;
        }
        
        public virtual Cliente Retorna(int id)
        {
            using var sessao = session.OpenSession();
            var cliente = sessao.Get<Cliente>(id);
            return cliente;
        }
        /* ESTÁTICO */

        private static int Contador = 1000;
        private static List<Cliente> Clientes = new List<Cliente>()
        {
            new Cliente { Nome = "Rodrigo teste", ID = 1, DataNascimento = new DateTime(2000,1,1), Email = "teste@email.com" },
            new Cliente { Nome = "Fulano de tal", ID = 2, DataNascimento = new DateTime(2000,2,1), Email = "fulano@email.com" },
            new Cliente { Nome = "Jobiscleyson Souza", ID = 3, DataNascimento = new DateTime(2000,1,5), Email = "job@email.com" },
            new Cliente { Nome = "Maria josé", ID = 4, DataNascimento = new DateTime(1998,1,1), Email = "maria@email.com" },
        };

        public static bool Validacao(Cliente cliente,
            out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            var valido = Validator.TryValidateObject(cliente,
                new ValidationContext(cliente),
                erros,
                true
            );

            var diaMinimo = DateTime.Today.AddYears(-18);
            if (cliente.DataNascimento > diaMinimo)
            {
                erros.Add(new ValidationResult(
                        "O cliente deve ser maior de 18 anos",
                        new[] { "DataNascimento" })
                    );
                valido = false;
            }

            return valido;
        }

        public static bool CriarCliente(Cliente cliente,
            out List<ValidationResult> erros)
        {
            cliente.ID = Contador++;
            var valido = Validacao(cliente, out erros);
            if (valido)
            {
                Clientes.Add(cliente);
            }
            else
            {
                foreach (var erro in erros)
                {
                    Console.WriteLine("{0}: {1}",
                        erro.MemberNames.First(),
                        erro.ErrorMessage
                    );
                }
            }
            return valido;
        }

        public static bool EditarCliente(Cliente novoCliente,
            out List<ValidationResult> erros)
        {
            var clienteExistente = Clientes.
                FirstOrDefault(x => x.ID == novoCliente.ID);

            erros = new List<ValidationResult>();

            if (clienteExistente == null)
            {
                return false;
            }

            var valido = Validacao(novoCliente, out erros);
            if (valido)
            {
                clienteExistente.Nome = novoCliente.Nome;
                clienteExistente.Email = novoCliente.Email;
                clienteExistente.DataNascimento = novoCliente.DataNascimento;
            }
            return valido;
        }

        public static List<Cliente> ListarTodos()
        {
            return Clientes;
        }
        public static List<Cliente> ListarPage(string buscaCliente,
            int skip = 0, int pageSize = 0)
        {
            var consulta = Clientes.Where(a =>
                    a.ID.ToString() == buscaCliente ||
                    a.Nome.Contains(buscaCliente,
                            StringComparison.OrdinalIgnoreCase) ||
                    a.Email.Contains(buscaCliente)
                )
                .OrderBy(x => x.DataNascimento)
                .AsEnumerable();
            if (skip > 0)
            {
                consulta = consulta.Skip(skip);
            }
            if (pageSize > 0)
            {
                consulta = consulta.Take(pageSize);
            }

            return consulta.ToList();
        }

        public static Cliente Remover(int codigo)
        {
            var cliente = Clientes
                        .Where(x => x.ID == codigo)
                        .FirstOrDefault();
            Clientes.Remove(cliente);
            return cliente;
        }

        public List<Divida> ListarDividas()
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>()
                .OrderByDescending(d => d.Valor)
                .ToList();
            return dividas;
        }

        public List<Divida> ListarDividas(int clienteId)
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>()
                .Where(d => d.Id == clienteId)
                .OrderByDescending(d => d.Valor)
                .ToList();
            return dividas;
        }
        
    }
}