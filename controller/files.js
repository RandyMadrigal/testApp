const path = require("path");
const { readFileSync } = require("fs");
const fs = require("fs");
const PDFParser = require("pdf-parse");

const filesPDF = require("../model/filesPDF");

exports.getIndex = (req, res, next) => {
  res.render("app/index", { title: "home" });
};

exports.getUploadFile = (req, res, next) => {
  res.render("app/uploadFile", { title: "upload Pdf" });
};

exports.postUploadFile = (req, res, next) => {
  const uploadpdf = req.file;
  console.log(uploadpdf);

  const Titulo = uploadpdf.originalname;
  const Filepath = uploadpdf.path;

  filesPDF
    .create({ Titulo: Titulo, Filepath: Filepath })
    .then((result) => {
      console.log(result);
      res.redirect("/index");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFiles = (req, res, next) => {
  filesPDF
    .findAll()
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      res.render("app/Files", {
        title: "All PDF",
        Item: item,
        hasItems: item.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFile = (req, res, next) => {
  const fileId = req.params.Id;

  filesPDF
    .findByPk(fileId)
    .then((result) => {
      const item = result.dataValues;

      const filepath = path.join(item.Filepath);

      fs.readFile(filepath, (err, data) => {
        if (err) {
          return next(err);
        }
        res.setHeader("Content-Type", "application/pdf");
        res.send(data);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.readFile = (req, res, next) => {
  const fileId = req.params.Id;

  filesPDF
    .findByPk(fileId)
    .then((result) => {
      const item = result.dataValues;
      const filepath = path.join(item.Filepath);

      // Read the PDF file synchronously
      const pdfData = readFileSync(filepath);

      // Parse the PDF data
      PDFParser(pdfData)
        .then((data) => {
          const textContent = data.text;
          console.log(`Text: ${textContent}`);
          // Process the extracted text content as required
        })
        .catch((error) => {
          console.error("Error parsing PDF:", error);
        });

      res.redirect("/getFiles");
    })
    .catch((err) => {
      console.log(err);
    });
};
