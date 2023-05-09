const express = require("express");
const {
  uploadPhoto,
  addNewPlace,
  getAllPlaces,
  updatePlace,
  getPlace,
} = require("../controllers/placesController");
const photosMiddleware = require("../middlewares/photosMiddleware");
const { uploadPhotosByLink } = require("../uploads/uploadPhotosByLink");
const router = express.Router();

router.route("/upload-by-link").post(uploadPhotosByLink);
router
  .route("/upload")
  .post(photosMiddleware.array("photos", 100), uploadPhoto);

router.route("/all-places").get(getAllPlaces);
router.route("/place").post(addNewPlace);
router.route("/place/:id").get(getPlace).put(updatePlace);

module.exports = router;
