import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';

const app = express();
app.use(cors());
app.options('*', cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.json({ name: "Nameless", status: true, id: 1 });
});
app.get('/page', async (req, res) => {
    res.render('index');
});

const port: number = (process.env.PORT as unknown as number) || 3000;
const host = 'localhost';
app.listen(port, host, () => {
    console.log(`start on port: ${port}`);
});
