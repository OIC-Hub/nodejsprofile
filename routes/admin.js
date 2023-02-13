 const express = require('express');
 const router = express.Router();
 const path = require('path');
 const fs = require('fs');
 const datapath = path.join(__dirname, '..', 'data', 'users.json');
 router.get('/admin', (req, res)=>{
       res.render('admin/index');
 })
 router.get('/add-user', (req, res)=>{
    res.render('admin/add-user');
 })

 router.post('/add-user', (req, res)=>{
      let user = req.body
    
      fs.readFile(datapath, (err, data)=>{
        if(!err){
       let users= JSON.parse(data)
         user.id = users.length;
        users.push( user)
          fs.writeFile(datapath, JSON.stringify(users), (err)=>{
        if(err) throw "Something went wrong"

        res.redirect('/admin')
      })

    }
      })
    
 })
 module.exports = router