 const express = require('express');
 const router = express.Router();
 const path = require('path');
 const fs = require('fs');
 const datapath = path.join(__dirname, '..', 'data', 'users.json');
 router.get('/admin', (req, res)=>{
  fs.readFile(datapath, (err, data)=>{
    if(!err){
   let fileData= JSON.parse(data)
   res.render('admin/index', {users:fileData});
    }
  })
      
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
 router.post('/admin-delete-user', (req, res)=>{
  let id =req.body.userId;
  fs.readFile(datapath, (err, data)=>{
     let filedata = JSON.parse(data);
    const newData= filedata.filter((value, index)=>{
      return value.id  !=id
    })
     fs.writeFile(datapath, JSON.stringify(newData), err=>{
      if(err) throw err
      res.redirect('/admin')
     } )
  });
 })

 router.get('/admin-update-user/:id', (req, res)=>{
       let id= req.params.id;
       fs.readFile(datapath, (err, data)=>{
        let filedata = JSON.parse(data);
         let newData = filedata.filter((value)=>{
           return value.id == id
         });
        res.render('admin/update-user', {user:newData})
       })
 })

 router.post('/update-user', (req, res)=>{
  let updatedData =req.body
  fs.readFile(datapath, (err, data)=>{
 let fildata = JSON.parse(data)
 let newData =[]
 for(let i =0; i < fildata.length; i++){
  if(fildata[i].id == updatedData.id){
    newData[i] = updatedData
  }else{
    newData[i] = fildata[i];
  }
 
 }
   fs.writeFile(datapath, JSON.stringify(newData), (err)=>{
    if(err) throw err
   })
   res.redirect('/admin')
  });
 })

 module.exports = router