const express = require("express");
const router = express.Router();
const filesController = require("../controller/files");

router.get("/index", filesController.getIndex);

router.get("/uploadFile", filesController.getUploadFile);
router.post("/uploadFile", filesController.postUploadFile);

router.get("/getFiles", filesController.getFiles);
router.get("/getFiles/:Id", filesController.getFile);
router.get("/readFiles/:Id", filesController.readFile);

exports.router = router;
