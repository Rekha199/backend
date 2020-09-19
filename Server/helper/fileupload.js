const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('Within the desination',file);
      cb(null, "./Server/helper/uploads");
    },
    filename: function(req, file, cb) {
        console.log('file.originalname',new Date().toISOString() + file.originalname);
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
const upload = multer({ storage: storage });
module.exports = upload;