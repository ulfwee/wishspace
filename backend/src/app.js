const express = require('express');
const userRoutes = require('./routes/UserRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("WishSpace Server is ALIVE! 🚀");
});

app.use('/users', userRoutes);

module.exports = app;