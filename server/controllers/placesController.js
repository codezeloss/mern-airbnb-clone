const fs = require("fs");
const Place = require("../models/Place");
const jwt = require("jsonwebtoken");

// @desc   Upload a Photo
// @route  POST /upload
// @access Private
const uploadPhoto = (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
};

// @desc   Add new accommodation Place
// @route  POST /add-new-place
// @access Private
const addNewPlace = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);

  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfos,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  if (!token) {
    res.status(404).json("No token found");
    return;
  }

  // JWT -- to get infos from the token
  await jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
    if (err) throw err;

    const place = await Place.create({
      owner: info.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfos,
      checkIn,
      checkOut,
      maxGuests,
    });

    res.json(place);
  });
};

// @desc   Get all added places added by the user
// @route  GET /get-all-places
// @access Private
const getAllPlaces = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    res.status(404).json("No token found");
    return;
  }

  // JWT -- to get infos from the token
  await jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
    if (err) throw err;

    const { id } = info;
    const allPlaces = await Place.find({ owner: id });

    res.json(allPlaces);
  });
};

// @desc   Get a specific place using the id
// @route  GET /get-all-places/:id
// @access Private
const getPlace = async (req, res) => {
  const { id } = req.params;

  const place = await Place.findById(id);
  res.json(place);
};

// @desc   Get a specific place using the id
// @route  GET /get-all-places/:id
// @access Private
const updatePlace = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfos,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  await jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
    if (err) throw err;

    const place = await Place.findById(id);

    if (info.id === place.owner.toString()) {
      const updatedPlace = await Place.findByIdAndUpdate(id, {
        title,
        address,
        photos,
        description,
        perks,
        extraInfos,
        checkIn,
        checkOut,
        maxGuests,
      });
      res.json(updatedPlace);
    }
  });
};

module.exports = {
  uploadPhoto,
  addNewPlace,
  getAllPlaces,
  getPlace,
  updatePlace,
};
