require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3700;
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars"); //Engine view
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//database
const sequelize = require("./util/database/database");
const filesPDF = require("./model/filesPDF");

//routes
const authRouter = require("./routes/auth");
const filesRouter = require("./routes/files");

const app = express();

app.engine(
  "hbs",
  expressHbs.engine({
    extname: "hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "main-layouts",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./data/PDF");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("uploadpdf")
);
app.use(express.static(path.join(__dirname, "public")));

app.use(authRouter.router);
app.use(filesRouter.router);

sequelize
  .sync()
  .then((result) => {
    //console.log(result);
    app.listen(PORT, () => {
      console.log(`running in PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
