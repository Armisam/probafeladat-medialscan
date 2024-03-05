using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using ProbafeladatApi.Models;

namespace ProbafeladatApi.Services
{
    public class ItemService
    {
        private readonly string _filePath = Path.Combine("Data", "Items.json");

        public IEnumerable<Item> GetItems()
        {
            if (!File.Exists(_filePath)) {
                return new List<Item>();
            }
            var json = File.ReadAllText(_filePath);
            return JsonConvert.DeserializeObject<List<Item>>(json);
        }

        public void SaveItems(IEnumerable<Item> items)
        {
            var json = JsonConvert.SerializeObject(items);
            File.WriteAllText(_filePath, json);
        }

        public void AddItem(Item item)
        {
            var items = GetItems().ToList();
            items.Add(item);
            SaveItems(items);
        }
    }
}
