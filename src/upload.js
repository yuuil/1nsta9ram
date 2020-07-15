import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.S3_API_ID,
  secretAccessKey: process.env.S3_API_SECRET_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "1nsta9ram",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    },
    acl: "public-read",
  }),
});

export const uploadMiddleware = upload.array("file", 10);

export const uploadController = (req, res) => {
  const { files } = req;
  const urls = files.map((f) => f.location);
  res.json({ location: urls });
};
