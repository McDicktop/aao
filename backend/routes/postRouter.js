const Router = require('express');

const upload = require('../utils/multer');

const { controller } = require('../controller/postController.js')

const handleMulter = require('../middlewares/handleMulter.js');
const checkFileUpload = require('../middlewares/checkFileUpload.js');
const processImage = require('../middlewares/processImage.js');

const router = new Router();


router.get('/', controller.getPosts);
router.post('/', handleMulter(upload.single("image")), checkFileUpload, processImage, controller.addPost);
router.patch('/:id', controller.toggleStatus);
router.delete('/:id', controller.deletePost);


// router.delete('/file/:filename', controller.deleteFile);                                    // + Delete file from server

module.exports = router;