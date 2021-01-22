// @ts-check

const express = require('express')
const app = express()
const multer  = require("multer");
app.use(express.static(__dirname));
app.use(
    multer({dest: "uploads"}).single("filedata")
);


app.post("/upload", function (req, res, next) {
   
    var filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});

 app.listen(3000)
