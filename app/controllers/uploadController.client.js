'use strict';

(function () {

   var form = document.getElementById('fileForm');
   var sizeView = document.getElementById('sizeView');
   var fileField = document.getElementById('fileFieldId');
   var apiUrl = appUrl + '/api/analyzefile/';

   //callback from server
   function updateFileSize (data) {
      var file = JSON.parse(data);
      if (file.error)
         alert("File too large (2MB Limit), please try again with a smaller file.");
      else
         sizeView.innerHTML = file.size + " bytes";
   }

   //Create FormData object to pass data to AJAX send()
   //Use FormData.get() to log data prior to send()
   form.addEventListener('submit', function (e) {
      var data = new FormData();
      //multer requires FormData key to be the same as the field name
      data.append("fileField", fileField.files["0"]);
      e.preventDefault();
      ajaxFunctions.ajaxRequest('POST', apiUrl, updateFileSize, data);
   });

})();
