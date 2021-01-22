// @ts-check
import { promises as fs } from 'fs';

(async () => {

  const data = await fs.readFile('./db.json', { encoding: 'utf-8' });
  const json = JSON.parse(data);
  
  console.log(json);

})();

