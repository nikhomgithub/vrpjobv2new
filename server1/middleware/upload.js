const multer = require('multer');

  const storage =multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, req.folder);
    },
    filename: function(req, file, cb) {
      cb(null,file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // allow jpeg and png
    //if (file.mimetype === 'image/*') {
      cb(null, true);
    //} else {
    //  cb(new Error('message',false)); //not save
   // }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

  module.exports = upload;
