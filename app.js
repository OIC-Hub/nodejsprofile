const express= require('express');
const path = require('path');
const adminUserRoutes = require('./routes/admin');
const bodyParser=require('body-parser')
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(adminUserRoutes);
app.listen(3000)