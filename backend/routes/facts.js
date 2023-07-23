const router = require("express").Router();
let Fact = require("../models/facts.model");

router.route("/").get((req, res) => {
	Fact.aggregate([{ $sample: { size: 3 } }])
		.then((facts) => res.json(facts))
		.catch((err) => res.status(400).json("Error: " + err));

	// Fact.find()
	// 	.then((facts) => res.json(facts))
	// 	.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const fact = req.body.fact;
	const createdBy = req.body.createdBy;
	const verified = req.body.verified;

	const newFact = new Fact({ fact, createdBy, verified });

	newFact
		.save()
		.then(() => res.json("Fact has been submitted!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
	Fact.findById(req.params.id).then((fact) => res.json(fact));
});

router.route("/:id").delete((req, res) => {
	Fact.findByIdAndDelete(req.params.id)
		.then((fact) => res.json("fact deleted"))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
	Fact.findById(req.params.id)
		.then((fact) => {
			fact.fact = req.body.fact;
			fact.createdBy = req.body.createdBy;
			fact.verified = req.body.verified;
			// add if check here. if verified === true, make it equal to false, in case someone changes the request
			fact.save().then(() => res.json("Fact updated!"));
		})

		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
