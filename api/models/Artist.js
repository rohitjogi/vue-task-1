var mongoose = require("mongoose");

var ArtistSchema = new mongoose.Schema(
	{
		aid: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "can't be blank"],
			index: true,
		},
		name: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "can't be blank"],
			index: true,
		},
		albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
	},
	{ timestamps: true }
);

ArtistSchema.methods.toJSON = function () {
	return {
		_id: this._id,
		aid: this.aid,
		name: this.name,
	};
};

mongoose.model("Artist", ArtistSchema, "artists");
