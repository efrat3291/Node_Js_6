import booksRouter from './routes/book.route.js';
import usersRouter from './routes/user.route.js';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json('Welcome');
});

app.use('/books', booksRouter);

app.use('/users', usersRouter);

app.listen(5000, () => {
    console.log('השרת רץ על פורט 3000');
});  
