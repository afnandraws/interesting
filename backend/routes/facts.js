const router = require("express").Router();
let Fact = require("../models/facts.model");

//getting random facts for the main page, currently set to 3
router.route("/").get((req, res) => {
	Fact.aggregate([{ $sample: { size: 100 } }])
		.then((facts) => res.json(facts))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getcount").get((req, res) => {
	Fact.countDocuments()
		.then((count) => res.json(count))
		.catch((err) => res.status(400).json("Error " + err));
});

// this is for someone to submit a new fact
router.route("/add").post((req, res) => {
	const fact = req.body.fact;
	const createdBy = req.body.createdBy;
	const verified = false;

	const newFact = new Fact({ fact, createdBy, verified });

	newFact
		.save()
		.then(() => res.json("Fact has been submitted!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

//this is the get a specific fact
router.route("/:id").get((req, res) => {
	Fact.findById(req.params.id).then((fact) => res.json(fact));
});

//this is to delete a specific fact
router.route("/:id").delete((req, res) => {
	Fact.findByIdAndDelete(req.params.id)
		.then((fact) => res.json("fact deleted"))
		.catch((err) => res.status(400).json("Error: " + err));
});

//update a specific fact
router.route("/update/:id").post((req, res) => {
	Fact.findById(req.params.id)
		.then((fact) => {
			fact.fact = req.body.fact;
			fact.createdBy = req.body.createdBy;
			fact.verified = false;
			fact.save().then(() => res.json("Fact updated!"));
		})
		.catch((err) => res.status(400).json("Error: " + err));
});

//get someone's favourite posts
router.route("/favourites").post((req, res) => {
	const favourites = req.body.facts;
	Fact.find({ _id: { $in: favourites } }) //this gets all the documents within that array which is sent
		.then((facts) => res.json(facts))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
