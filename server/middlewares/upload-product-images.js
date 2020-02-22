import upload from "../helpers/multerUtil";

const cpUpload = upload.fields([
  { name: "mainPicture", maxCount: 1 },
  { name: "secondPicture", maxCount: 1 },
  { name: "thirdPicture", maxCount: 1 },
  { name: "fourthPicture", maxCount: 1 }
]);

export default cpUpload;
