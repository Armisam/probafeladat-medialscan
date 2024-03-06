using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

using ProbafeladatApi.Models;
using ProbafeladatApi.Services;

namespace ProbafeladatApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ItemService _itemService;

        public ItemsController(ItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public IEnumerable<Item> Get()
        {
            return _itemService.GetItems();
        }

        [HttpGet("{id}")]
        public ActionResult<Item> GetById(int id)
        {

            var item = _itemService.GetItems().FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Item item)
        {
            var items = _itemService.GetItems().ToList();
            int maxId = items.Any() ? items.Max(i => i.Id) : 0;
            int newId = maxId + 1;
            item.Id = newId;
            _itemService.AddItem(item);

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Item item)
        {
            var items = _itemService.GetItems().ToList(); 
            var index = items.FindIndex(i => i.Id == id); 
            var existingItem = _itemService.GetItems().FirstOrDefault(x => x.Id == id);
            if (existingItem == null)
            {
                return NotFound();
            }
            existingItem.Name = item.Name;
            existingItem.Type = item.Type;
            existingItem.Price = item.Price;

            items[index] = existingItem; 
            _itemService.SaveItems(items); 

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var items = _itemService.GetItems().ToList(); 

            var existingItem = items.FirstOrDefault(x => x.Id == id);
            if (existingItem == null)
            {
                return NotFound();
            }

            items.RemoveAll(x => x.Id == id); 
            _itemService.SaveItems(items);

            return Ok();
        }
    }
}
