import booksRouter from './routes/book.route.js';
import usersRouter from './routes/user.route.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { addCurrentDate, printDate} from './middlewares/addDate.middleware.js';
import { errorHandler, notFound } from './middlewares/err.middleware.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(addCurrentDate);
app.use(printDate);

app.get('/', (req, res) => {
    res.json('Welcome');
});

app.use('/books', booksRouter);

app.use('/users', usersRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
    console.log('השרת רץ על פורט 5000');
});  
