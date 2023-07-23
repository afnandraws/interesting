const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const factSchema = new Schema(
	{
		fact: {
			type: String,
			required: true,
			unique: true,
		},
		createdBy: {
			type: String,
			trim: true,
			minlength: 7,
		},
		verified: { type: Boolean, required: true },
	},
	{
		timestamps: true,
	}
);

const Fact = mongoose.model("Fact", factSchema);

module.exports = Fact;
