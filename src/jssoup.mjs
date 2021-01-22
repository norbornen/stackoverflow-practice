// @ts-check

import $JSSoup from 'jssoup';
// @ts-ignore
const JSSoup = $JSSoup.default;

const soup = new JSSoup('<html><head>hello</head></html>');
var tag = soup.find('head');
console.log(tag);
