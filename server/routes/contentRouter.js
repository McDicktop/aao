const Router = require('express');

// const multer = require('../utils/multer.js');


const upload = require('../utils/multer');

const { controller } = require('../controller/galleryController.js')

const handleMulter = require('../middlewares/handleMulter.js');                 // handle upload errors (file size, file exts)
const checkFileUpload = require('../middlewares/checkFileUpload.js');                       // check if not only file is uploads
const processImage = require('../middlewares/processImage.js');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware.js')

const router = new Router();

// Image routes
router.get('/', controller.getImages);                                                      // + Get all images from DB   
router.post('/', handleMulter(upload.single("image")), checkFileUpload, processImage, controller.postImage);                // + Upload new artwork with description to DB
router.put('/:id', controller.editImage);                                                   // + Edit image title, description, size or status
router.delete('/:id', controller.deleteArtwork);                                            // + Delete image from DB

// Gallery routes
router.get('/gallery', controller.getGalleries);                                            // + Get all Galleries from DB
router.get('/gallery/:id', controller.getGalleryItems);                                     // + Get Gallery content by id
// router.post('/gallery', authenticate, isAdmin, handleMulter(upload.single("image")), checkFileUpload, processImage, controller.addGallery);        // + Add new Gallery with uploading cover image and full description to DB
router.post('/gallery', handleMulter(upload.single("image")), checkFileUpload, processImage, controller.addGallery);        // + Add new Gallery with uploading cover image and full description to DB
router.delete('/gallery/:id', controller.deleteGallery);                                    // + Delete Gallery from DB if Gallery is empty (Gallery.content = []) and Gallery is not ROOT gallery)
router.put('/gallery/:id', controller.editGallery);                                         // + Edit Gallery title or status - PUT or PATCH ???? меняется _id в title ????????
router.patch('/gallery/:id', handleMulter(upload.single("image")), checkFileUpload, processImage, controller.changeCover);  // + Change Gallery cover
router.patch('/gallery/add/:id', controller.addImageToGallery);                             // + Add image._id to gallery.content by gallery id
router.delete('/gallery/remove/:id', controller.removeImageFromGallery);                    // + Remove image._id from gallery.content by gallery id
router.patch('/gallery/move/:id', controller.moveImage);                                    // + Change artwork (image._id) order in gallery

router.patch('/gallery/position/:id', controller.changePosition);                        //  Change gallerie position in Gallery collection

router.delete('/file/:filename', controller.deleteFile);                                    // + Delete file from server

module.exports = router;