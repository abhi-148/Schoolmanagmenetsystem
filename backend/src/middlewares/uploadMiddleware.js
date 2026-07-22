const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    if (file.fieldname === "receipt") {

      cb(null, "uploads/receipts");

    }

    else if (file.fieldname === "image") {

      cb(null, "uploads/lost-found");

    }

  },

  filename: (req, file, cb) => {

    const fileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);

    cb(null, fileName);

  }

});

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowed = [

    "image/jpeg",

    "image/png",

    "image/jpg",

    "application/pdf"

  ];

  if (
    allowed.includes(file.mimetype)
  ) {

    cb(null, true);

  }

  else {

    cb(
      new Error(
        "Only JPG, PNG and PDF files are allowed."
      ),
      false
    );

  }

};

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      5 * 1024 * 1024

  }

});

module.exports = upload;