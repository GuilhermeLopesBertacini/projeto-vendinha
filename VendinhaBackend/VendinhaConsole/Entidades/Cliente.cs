using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendinhaConsole.Entidades
{
    public class Cliente
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo CPF é obrigatório.")]
        public string CPF { get; set; }

        [Required(ErrorMessage = "O campo Data de Nascimento é obrigatório.")]
        public DateTime? DataNascimento { get; set; }

        public string Email { get; set; }

        public void PrintarDados()
        {
            Console.WriteLine("ID: {0} | Nome: {1} | CPF: {2} | Data de nascimento: {3:dd/MM/yyyy}",
                ID, Nome, CPF, DataNascimento);
        }
    }
}
