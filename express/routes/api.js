var express = require('express');
var router = express.Router();


router.use(function(req,res,next){
	if(req.method === "GET")
			return next();
	if (!req.isAuthenticated()){
			return res.redirect('#login');
	}

	//User authenticated, continue to next middleware

	return next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.route('/posts')

	//Get all posts
	.get(function(req,res){
		//Send posts

		res.send({message: "TODO Send the posts"});
	})

	.post(function(req,res){
		//Add a post
		res.send({message: "TODO Create a new post"});
	});

router.route('/posts/:id')
	
	.get(function(req,res){
		res.send({message: "TODO get the post with id:"+ req.params.id});
	})

	.put(function(req,res){
		res.send({message:"TODO update a new post with id:"+req.params.id});
	})

	.delete(function(req,res){
		res.send({message: "TODO delete post with id:" + req.params.id});
	});

module.exports = router;
