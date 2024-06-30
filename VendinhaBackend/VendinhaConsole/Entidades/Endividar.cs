namespace VendinhaConsole.Entidades
{
    public class Endividar
    {
        public int Id { get; set; }
        public Divida Divida { get; set; }
        public Cliente Cliente { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;

    }
}