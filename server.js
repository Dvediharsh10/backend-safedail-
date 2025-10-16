const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');

const cors = require('cors');

require('dotenv').config();

const functions = require('firebase-functions'); // Assuming this is for Firebase setup

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser());

app.use(cors({

    origin: "*", 

    credentials: true
}));
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/User');
const contactRoutes = require('./routes/Contact');
const adminRoutes = require('./routes/Admin');
const apiRoutes = require('./routes/Routes_Api');
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.use('/api/v1/contacts', contactRoutes);

app.use('/api/v1/admin', adminRoutes);

app.use('/api', apiRoutes);

app.get('/', (req, res) => {

    res.send("This is Home page");
});
const DBconnect = require('./config/database');

DBconnect();

if (!process.env.FUNCTION_NAME) {

    app.listen(PORT, () => {

        console.log(`App is running locally in PORT ${PORT}`);
 });
}

exports.api = functions.https.onRequest(app);
