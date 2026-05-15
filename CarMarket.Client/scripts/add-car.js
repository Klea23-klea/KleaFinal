const form = document.getElementById("car-form");

form.addEventListener("submit", async (e) => {

	e.preventDefault();

	const car = {

		brand:
			document.getElementById("brand").value,

		model:
			document.getElementById("model").value,

		price:
			document.getElementById("price").value
	};

	await fetch(
		"http://localhost:5091/api/cars",
		{
			method: "POST",

			headers: {
				"Content-Type": "application/json"
			},

			body: JSON.stringify(car)
		}
	);

	window.location.href = "index.html";
});