require('dotenv').config();

const express = require('express');
const app = express();
const UserRouter = require('./api/user/user.router');
const ProductRouter = require('./api/product/product.router');
const advRouter = require('./api/advertistment/adv.router');
const DecsRouter = require('./api/getProductDes/des.route');
const SellerRouter = require('./api/sellerProf/Prof.router');
const SRouter = require('./api/search/s.router');

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/user', UserRouter);
app.use('/api/product', ProductRouter);
app.use('/api/advertistment', advRouter);
app.use('/api/getProductDes', DecsRouter);
app.use('/api/selleDetail', SellerRouter);
app.use('/api/search', SRouter);



app.get('/dashboard', (req, res) => {
  res.send('Dashboard Page\nSuccessfully logged!');
});

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port', port);
});

