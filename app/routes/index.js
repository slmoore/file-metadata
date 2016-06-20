'use strict';

var path = process.cwd();
var UploadHandler = require(path + '/app/controllers/uploadHandler.server.js');

module.exports = function (app, multer) {
	
	var uploadHandler = new UploadHandler();
	
	var upload = multer({
	    dest: path + '/uploads/',
	    limits: { fileSize: process.env.MAX_FILE_SIZE }
	});
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/analyzefile/')
		.post(
			upload.single('fileField'),
			uploadHandler.getSize,
			uploadHandler.deleteUpload
		);

};
