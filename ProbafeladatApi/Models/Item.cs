namespace ProbafeladatApi.Models;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public decimal Price { get; set; }

    public Item()
    {
        Name = string.Empty;
        Type = string.Empty; 
    }
}