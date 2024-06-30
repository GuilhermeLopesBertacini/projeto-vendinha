using NHibernate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendinhaConsole.Entidades;
using VendinhaConsole.Dtos;
using static System.Collections.Specialized.BitVector32;

namespace VendinhaConsole.Services
{
    public class DividaService
    {
        private readonly ISessionFactory session;

        public DividaService(ISessionFactory session)
        {
            this.session = session;
        }

        public static bool Validacao(Divida cliente,
            out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            var valido = Validator.TryValidateObject(cliente,
                new ValidationContext(cliente),
                erros,
                true
            );

            return valido;
        }

        public bool Criar(Divida divida, out List<ValidationResult> erros)
        {
            if (Validacao(divida, out erros))
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Save(divida);
                transaction.Commit();
                return true;
            }
            return false;
        }

        public bool Editar(Divida divida, out List<ValidationResult> erros)
        {
            if (Validacao(divida, out erros))
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Merge(divida);
                transaction.Commit();
                return true;
            }
            return false;
        }

        public bool Excluir(int id, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            using var sessao = session.OpenSession();
            using var transaction = sessao.BeginTransaction();
            var divida = sessao.Query<Divida>()
                .Where(c => c.Id == id)
                .FirstOrDefault();
            if (divida == null)
            {
                erros.Add(new ValidationResult("Registro não encontrado",
                    new[] { "id" }));
                return false;
            }

            sessao.Delete(divida);
            transaction.Commit();
            return true;
        }

        public virtual List<Divida> Listar()
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>().OrderByDescending(c => c.Id).ToList();
            return dividas;
        }


        public virtual Divida Retorna(int codigo)
        {
            using var sessao = session.OpenSession();
            var divida = sessao.Get<Divida>(codigo);
            return divida;
        }

        public virtual List<Divida> Listar(string busca)
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>()
                .Where(c => c.Descricao.Contains(busca))
                .OrderBy(c => c.Id)
                .Take(4)
                .ToList();
            return dividas;
        }

    }

    //public virtual List<Curso> ListarDto()
    //{
    //    using var sessao = session.OpenSession();
    //    var cursos = sessao.Query<Curso>()
    //        .Select(x => new CursoDto(x))
    //        .OrderBy(c => c.Id)
    //        .Take(4)
    //        .ToList();
    //    return cursos;
    //}

    //public class DividaService2 : DividaService
    //{
    //    public DividaService2(ISessionFactory session) : base(session)
    //    {
    //    }

    //    public override List<Divida> Listar()
    //    {
    //        return base.Listar();
    //    }
    //}

    //     public List<Divida> ConsultaDividasPorSituacao()
    // {
    //     using var sessao = session.OpenSession();
    //     var dividas = sessao.Query<Divida>()
    //         .Where(d => d.Divida == true)
    //         .ToList();
    //     return dividas;
    // }

}

