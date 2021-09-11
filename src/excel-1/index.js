// @ts-check
const { default: axios } = require('axios');
const excelToJson = require('convert-excel-to-json');

axios(
  'https://www.wisdomaxis.com/technology/software/data/for-reports/Data%20Blending%20File%20One.xlsx',
  { responseType: 'arraybuffer' }
).then(({ data }) => {
  const result = excelToJson({ source: data });
  console.log(result);
})
.catch(console.error);
