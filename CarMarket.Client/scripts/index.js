const container = document.getElementById("cars-container");

const carImages = [
	"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",

	"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",

	"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop"
];

async function loadCars() {

	const response = await fetch(
		"http://localhost:5091/api/cars"
	);

	const cars = await response.json();

	container.innerHTML = "";

	cars.forEach(car => {

		const randomImage =
			carImages[
			Math.floor(
				Math.random() * carImages.length
			)
			];

		container.innerHTML += `

            <div class="car-card">

                <img
                    src="${randomImage}"
                    class="car-image"
                />

                <h3>${car.brand}</h3>

                <p>${car.model}</p>

                <p class="price">
                    € ${car.price}
                </p>

                <button
                    class="delete-btn"
                    onclick="removeCar(${car.id})"
                >
                    Delete
                </button>

                <a href="edit-car.html?id=${car.id}">
                    <button class="edit-btn">
                        Edit
                    </button>
                </a>

            </div>
        `;
	});
}

async function removeCar(id) {

	await fetch(
		`http://localhost:5091/api/cars/${id}`,
		{
			method: "DELETE"
		}
	);

	loadCars();
}

loadCars();