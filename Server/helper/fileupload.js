const multer = require("multer");
// const data=require("../helper/uploads")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('Within the desination',file);
      cb(null, "./Server/helper/uploads");
    },
    filename: function(req, file, cb) {
        console.log('file.originalname',file.originalname);
      cb(null,file.originalname);
    }
  });
const upload = multer({ storage: storage });
console.log('Upload....',upload)
module.exports = upload;