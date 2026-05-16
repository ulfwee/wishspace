const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const wishlistRoutes = require('./routes/WishlistRoutes');
const wishItemRoutes = require('./routes/WishItemRoutes');
const FRequestRoutes = require('./routes/FRequestRoutes');
const NotificationRoutes = require('./routes/NotificationRoutes');
const BookingRoutes = require('./routes/BookingRoutes');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors({
    origin: 'https://wishspace-one.vercel.app/',
    credentials: true
}));
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("WishSpace Server is ALIVE! 🚀");
});

app.use('/users', userRoutes);

app.use('/wishlist', wishlistRoutes);

app.use('/', wishItemRoutes);

app.use('/friends', FRequestRoutes);

app.use('/notifications', NotificationRoutes);

app.use('/', BookingRoutes);

app.use('/admin', adminRoutes);

module.exports = app;