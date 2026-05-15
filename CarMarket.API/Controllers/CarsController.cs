using Microsoft.AspNetCore.Mvc;

using CarMarket.API.Models;

using System.Text.Json;

namespace CarMarket.API.Controllers
{
	[ApiController]

	[Route("api/[controller]")]
	public class CarsController : ControllerBase
	{
		private readonly string filePath =
			"Data/cars.json";

		private List<Car> GetCars()
		{
			var json =
				System.IO.File.ReadAllText(filePath);

			return JsonSerializer.Deserialize<List<Car>>(json);
		}

		private void SaveCars(List<Car> cars)
		{
			var json =
				JsonSerializer.Serialize(
					cars,
					new JsonSerializerOptions
					{
						WriteIndented = true
					}
				);

			System.IO.File.WriteAllText(
				filePath,
				json
			);
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			return Ok(GetCars());
		}

		[HttpPost]
		public IActionResult AddCar(Car car)
		{
			var cars = GetCars();

			car.Id =
				cars.Count > 0
				? cars.Max(c => c.Id) + 1
				: 1;

			cars.Add(car);

			SaveCars(cars);

			return Ok(car);
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteCar(int id)
		{
			var cars = GetCars();

			var car =
				cars.FirstOrDefault(c => c.Id == id);

			if (car == null)
			{
				return NotFound();
			}

			cars.Remove(car);

			SaveCars(cars);

			return Ok();
		}

		[HttpPut("{id}")]
		public IActionResult UpdateCar(
			int id,
			Car updatedCar
		)
		{
			var cars = GetCars();

			var car =
				cars.FirstOrDefault(c => c.Id == id);

			if (car == null)
			{
				return NotFound();
			}

			car.Brand = updatedCar.Brand;

			car.Model = updatedCar.Model;

			car.Price = updatedCar.Price;

			SaveCars(cars);

			return Ok(car);
		}
	}
}