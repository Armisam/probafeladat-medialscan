using NUnit.Framework;
using ProbafeladatApi.Controllers;
using ProbafeladatApi.Models;
using ProbafeladatApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ProbafeladatApi.Tests
{
    [TestFixture]
    public class ItemsControllerTests
    {
        private ItemsController? _controller;
        private ItemService? _itemService;

        [SetUp]
        public void Setup()
        {
            _itemService = new ItemService(); 
            _controller = new ItemsController(_itemService);
        }

        [Test]
        public void GetById_ExistingId_ReturnsItem()
        {
            var itemId = 1;
            var items = new List<Item>
            {
                new Item { Id = 1, Name = "Item 1", Type = "Type 1", Price = 10.0M },
                new Item { Id = 2, Name = "Item 2", Type = "Type 2", Price = 20.0M }
            };
            _itemService.AddItem(items[0]);
            _itemService.AddItem(items[1]);

            var actionResult = _controller.GetById(itemId);

            Assert.That(actionResult.Value, Is.Not.Null);
            var resultItem = (Item)((ObjectResult)actionResult.Result).Value;
            Assert.Equals(itemId, resultItem?.Id);
        }

        [Test]
        public void GetById_NonExistingId_ReturnsNotFound()
        {
            var itemId = 999;
            var actionResult = _controller.GetById(itemId);
            Assert.That(actionResult.Result, Is.InstanceOf<NotFoundResult>());
        }
    }
}
