var mongoose = require("mongoose");

var AlbumSchema = new mongoose.Schema(
	{
		alid: {
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
		albumArt: {
			type: String,
			required: [true, "can't be blank"],
			index: true,
		},
		artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
	},
	{ timestamps: true }
);

AlbumSchema.methods.toJSON = function () {
	return this.toObject();
};

mongoose.model("Album", AlbumSchema, "albums");
