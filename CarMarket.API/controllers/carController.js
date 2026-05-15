const fs = require("fs");
const path = require("path");

const filePath = path.join(
	__dirname,
	"../data/cars.json"
);

function getCars() {

	const data = fs.readFileSync(filePath);

	return JSON.parse(data);
}

function saveCars(cars) {

	fs.writeFileSync(
		filePath,
		JSON.stringify(cars, null, 2)
	);
}

exports.getAllCars = (req, res) => {

	const cars = getCars();

	res.json(cars);
};

exports.addCar = (req, res) => {

	const cars = getCars();

	const newCar = {
		id: Date.now(),

		brand: req.body.brand,

		model: req.body.model,

		price: req.body.price
	};

	cars.push(newCar);

	saveCars(cars);

	res.status(201).json(newCar);
};

exports.deleteCar = (req, res) => {

	let cars = getCars();

	cars = cars.filter(
		c => c.id != req.params.id
	);

	saveCars(cars);

	res.json({
		message: "Car deleted"
	});
};

exports.updateCar = (req, res) => {

	const cars = getCars();

	const carIndex = cars.findIndex(
		c => c.id == req.params.id
	);

	if (carIndex === -1) {

		return res.status(404).json({
			message: "Car not found"
		});
	}

	cars[carIndex] = {
		...cars[carIndex],

		brand: req.body.brand,

		model: req.body.model,

		price: req.body.price
	};

	saveCars(cars);

	res.json(cars[carIndex]);
}; 