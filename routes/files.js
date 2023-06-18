const express = require("express");
const router = express.Router();
const filesController = require("../controller/files");

router.get("/index", filesController.getIndex);

router.get("/uploadFile", filesController.getUploadFile);
router.post("/uploadFile", filesController.postUploadFile);

router.get("/getFiles", filesController.getFiles);
router.get("/getFiles/:Id", filesController.getFile);

exports.router = router;
