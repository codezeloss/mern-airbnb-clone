const imageDownload = require("image-downloader");

// @desc   Upload a photo using a link
// @route  POST /upload-by-link
// @access Private
const uploadPhotosByLink = async (req, res) => {
  const { link } = req.body;

  const newName = "photo" + Date.now() + ".jpg";
  
  await imageDownload.image({
    url: link,
    dest: __dirname + "/uploads" + newName,
  });

  res.json(newName);
};

module.exports = { uploadPhotosByLink };
