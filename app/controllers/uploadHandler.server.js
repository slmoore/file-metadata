'use strict';

function UploadHandler () {

	this.getSize = function (req, res) {
		return res.json({"size": req.file.size});
	};

}

module.exports = UploadHandler;
