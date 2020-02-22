import { v2 as cloudinary } from "cloudinary";
import env from "custom-env";

env.env();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class FileUtil {
  static async uploadFile(path, file) {
    try {
      const date = new Date().toISOString();
      const uniqueFilename = `RWT_${date}_file`;
      const uploadedFile = await cloudinary.uploader.upload(file, {
        public_id: `${path}/${uniqueFilename}`,
        tags: path
      });
      return uploadedFile;
    } catch (error) {
      console.log("ERR:", `Could Not Upload File, ${error.message}`);
      return null;
    }
  }

  static async uploadProductImages(files) {
    let images = {};
    images.mainPicture = await this.uploadProductImage(files.mainPicture[0]);
    images.secondPicture = await this.uploadProductImage(
      files.secondPicture[0]
    );
    images.thirdPicture = await this.uploadProductImage(files.thirdPicture[0]);
    images.fourthPicture = await this.uploadProductImage(
      files.fourthPicture[0]
    );
    return images;
  }

  static async uploadProductImage(image) {
    if (image) return await this.uploadFile("product", image.path);
  }
}

export default FileUtil;
