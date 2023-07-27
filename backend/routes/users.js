const router = require("express").Router();
let User = require("../models/user.model");

//get all the users
router.route("/all").get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json("Error: " + err));
});

//get one user - for logging in purposes
router.route("/").post((req, res) => {
	if (req.body.username === "" || req.body.password === "") {
		console.log("input error");

		res.status(404).json("Mandatory field: username or password missing. ");
	} else {
		User.findOne({
			username: req.body.username,
			password: req.body.password,
		})
			.select({ username: 1, savedPosts: 1 }) //this means that the password is protected from being exposed to the client
			.then((users) => {
				res.json(users);
			})
			.catch((err) => {
				res.status(400).json("Error: " + err);
			});
	}
});

//adding a new user
router.route("/add").post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const savedPosts = [];
	const newUser = new User({ username, password, savedPosts });

	if (username === "" || password === "") {
		console.log("input error");
		res.status(404).json("Mandatory field missing.");
	} else {
		newUser
			.save()
			.then(() => res.json("User added!"))
			.catch((err) => res.status(400).json("Error: " + err));
	}
});

//deleting an existing user
router.route("/deleteuser/:id").delete((req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOneAndRemove({
		_id: req.params.id,
		username: username,
		password: password,
	})
		.then(() => res.json("User deleted"))
		.catch((err) => res.status(400).json("Error: " + err));
});

//adding a post to someone's favourite list
router.route("/savepost").post((req, res) => {
	User.updateOne(
		{ _id: req.body.id },
		{ $push: { savedPosts: req.body.postID } }
	)
		.then(() => res.json("Fact has been saved"))
		.catch((err) => res.status(400).json("Error: " + err));
});

//remove a post from someone's favourite list
router.route("/unsavepost").post((req, res) => {
	User.updateOne(
		{ _id: req.body.id },
		{ $pull: { savedPosts: req.body.postID } }
	)
		.then(() => res.json("Fact has been unsaved"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
