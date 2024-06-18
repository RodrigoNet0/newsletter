import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes.js'; 
import { openDb } from './database.js'; 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

async function setupDatabase() {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE)');
}

setupDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});

