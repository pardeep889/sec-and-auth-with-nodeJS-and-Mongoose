const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true }).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(`Not connected to mongo ${err}`);
});
const { User } = require('./models/user');

app.use(bodyParser.json());

app.post('/api/user', (req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save((err,doc) => {
        if (err) res.status(200).send(err);
        res.status(200).send(doc)
        // console.log(doc);
    });
});

app.post('/api/user/login', (req,res,next) => {
    User.findOne({'email': req.body.email}, (err,user) => {
        if(!user){
            res.json({message: "User not found!"});
            };
         user.comparePassword(req.body.password,(err,isMatch) =>{
            if(err) throw err;
            if(!isMatch) return res.status(400).json({mseesage: 'wrong password'});
            res.status(200).send(isMatch);
         });
    })
})

const port = process.env.PORT || 3000;

app.listen(port,()=> {
    console.log(`App is running on ${port}`);
});
