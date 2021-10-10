const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(express.static(path.join(__dirname, 'views')));

app.post(
  '/csv-service',
  upload.single('csvfile'),
  (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.status(204).json({});
  }
);

app.listen(3000, () => {
  console.log('Server has been started at port 3000...');
});
