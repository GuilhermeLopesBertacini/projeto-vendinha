using System.ComponentModel.DataAnnotations;

namespace VendinhaConsole.Entidades;
public class Divida
{
    public int Id { get; set; }
    public decimal Valor { get; set; } // Valor da Dívida
    public string Situacao { get; set; }
    public DateTime DataCriacao { get; set; }
    public DateTime DataPagamento { get; set; }
    public string Descricao { get; set; } // Descrição do que foi comprado
    public virtual Cliente Cliente { get; set; }
}
public class DividaDto
{
    public DividaDto(Divida x)
    {

        Id = x.Id;
        Valor = x.Valor;
        Situacao = x.Situacao;
        DataCriacao = x.DataCriacao;
        DataPagamento = x.DataPagamento;
        Descricao = x.Descricao;
    }
    public int Id { get; set; }
    public decimal Valor { get; set; } // Valor da Dívida
    public string Situacao { get; set; }
    public DateTime DataCriacao { get; set; }
    public DateTime DataPagamento { get; set; }
    public string Descricao { get; set; } // Descrição do que foi comprado
    public virtual Cliente Cliente { get; set; }
}