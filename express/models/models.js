var mongoose= require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

var postSchema = new mongoose.Schema({
	text: String,
	username: String
	created_at: {type: Date, default: Date.now}
});

//declare models for user and schema

mongoose.model("user",userSchema);
mongoose.model("post",postSchema);