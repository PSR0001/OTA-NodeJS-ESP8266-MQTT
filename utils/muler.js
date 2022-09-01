const multer = require('multer');

const fileSystem = () => {
    // for uploaded file

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })

    return storage
}
module.exports = fileSystem