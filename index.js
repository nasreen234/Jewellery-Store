const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();

const productRoute = require("./Routes/Productroute.js");
const userRoutes = require("./Routes/Userroute.js");
const orderRoute = require("./Routes/Orderroute.js");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/api/products", productRoute); 
app.use("/api/users", userRoutes);
app.use("/api/orders",orderRoute);


app.get('/', (req, res) => {
  res.send('Jewellery API running...');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
