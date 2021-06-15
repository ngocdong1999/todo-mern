require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-todo.xi2yz.mongodb.net/mern-todo?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        console.log('Connect mongoose successfully!!')
    }
    catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

connectDB()

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRouter);
app.use('/api/posts',postRouter);


const PORT = process.env.PORT ||  5000;
app.listen(PORT,() => console.log(`Connect to  port ${PORT} Successfully!`))