const params =
	new URLSearchParams(window.location.search);

const id = params.get("id");

const form =
	document.getElementById("edit-form");

async function loadCar() {

	const response = await fetch(
		"http://localhost:3000/api/cars"
	);

	const cars = await response.json();

	const car = cars.find(
		c => c.id == id
	);

	if (!car) {

		alert("Car not found");

		window.location.href = "index.html";

		return;
	}

	document.getElementById("brand").value =
		car.brand;

	document.getElementById("model").value =
		car.model;

	document.getElementById("price").value =
		car.price;
}

form.addEventListener("submit", async (e) => {

	e.preventDefault();

	const updatedCar = {

		brand:
			document.getElementById("brand").value,

		model:
			document.getElementById("model").value,

		price:
			document.getElementById("price").value
	};

	await fetch(
		`http://localhost:3000/api/cars/${id}`,
		{
			method: "PUT",

			headers: {
				"Content-Type": "application/json"
			},

			body: JSON.stringify(updatedCar)
		}
	);

	window.location.href = "index.html";
});

loadCar();