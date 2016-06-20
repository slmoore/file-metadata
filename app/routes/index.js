'use strict';

var path = process.cwd();
var UploadHandler = require(path + '/app/controllers/uploadHandler.server.js');

module.exports = function (app, multer) {
	
	var uploadHandler = new UploadHandler();
	
	var upload = multer({
	    dest: path + '/uploads/',
	    limits: { 
	    	files: 1,
	    	fileSize: Number(process.env.MAX_FILE_SIZE)
	    }
	}).single('fileField');
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/analyzefile/')
		.post(function (req, res, next) {
				upload(req, res, function (err) {
				    if (err) {
						console.log(err.message);
						return res.json({"error": err.message});
				    } else {
				    	next();
				    }
				});
			},
			uploadHandler.getSize,
			uploadHandler.deleteUpload
		);

};
