import { Router } from 'express';
import { openDb } from './database.js'; 

const router = Router();

router.post('/add_subscriber', async (req, res) => {
    const db = await openDb();
    const { name, email, agree } = req.body;

    if (!agree) {
        return res.status(400).json({ message: 'Você deve concordar com os termos.' });
    }

    try {
        await db.run('INSERT INTO subscribers (name, email) VALUES (?, ?)', [name, email]);
        res.status(200).json({ message: 'Assinante adicionado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar assinante ou email já cadastrado' });
    }
});

router.get('/subscribers', async (req, res) => {
    const db = await openDb();
    const subscribers = await db.all('SELECT * FROM subscribers');
    res.status(200).json(subscribers);
});

export default router;