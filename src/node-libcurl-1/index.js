// @ts-check
const { curly } = require('node-libcurl');
const fs = require('fs');
const path = require('path');

(async () => {
  const { statusCode, data } = await curly.get(
    'http://mirprivet.ru/wp-content/uploads/2016/01/ostrova-portugalii-300x203.jpg'
  );

  fs.writeFileSync(
    path.join(__dirname, './image.jpg'),
    data
  );
})();
