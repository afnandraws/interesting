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
		},
		verified: { type: Boolean },
	},
	{
		timestamps: true,
	}
);

const Fact = mongoose.model("Fact", factSchema);

module.exports = Fact;
