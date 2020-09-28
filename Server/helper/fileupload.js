const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './Server/helper/uploads');
    },
    filename: function(req, file, cb) {
        console.log('file.originalname',file.originalname);
      cb(null,file.originalname);
    }
  });
const upload = multer({ storage: storage });
module.exports = upload;