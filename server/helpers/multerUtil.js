import multer from "multer";

function sanitizeFile(req, file, cb) {
  // Define the allowed extension
  let fileExts = ["png", "jpg", "jpeg", "gif"];

  // Check allowed extensions
  let isAllowedExt = fileExts.includes(
    file.originalname.split(".")[1].toLowerCase()
  );
  // Mime type must be an image
  let isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb("Error: File type not allowed!");
  }
}

// SET STORAGE
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function(req, file, cb) {
    const fileName = "product-" + Date.now() + "-" + file.originalname;
    cb(null, fileName);
  }
});
var upload = multer({ storage: storage, fileFile: sanitizeFile });

export default upload;
