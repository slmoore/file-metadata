'use strict';

var fs = require("fs");

function UploadHandler () {

	this.getSize = function (req, res, next) {
		res.json({"size": req.file.size});
		next();
	};
	
	this.deleteUpload = function (req, res) {
		try {
			fs.unlink(req.file.path, function (err) {
			  if (err) throw err;
			});
		} catch (e) {
			console.log(e.message);
		}
	};

}

module.exports = UploadHandler;
