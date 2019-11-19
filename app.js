const express = require('express');
const path = require('path');
const chalk = require('chalk');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = new express();
const mongoose=require('mongoose');

app.set('views','./src/views');

app.use(express.static(path.join(__dirname,'/public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.set('view engine','ejs');

var nav = [
    { link:'/',title:'Add Students' },
    { link:'/viewAll',title:'View All'},
    { link:'/search',title:'Search'},
    { link:'/update',title:'Update'}

];

const viewAllRouter = require('./src/routes/viewAllRoutes')(nav);
const searchRouter = require('./src/routes/searchRoutes')(nav);
const updateRouter = require('./src/routes/updateRoutes')(nav);
// const stdModel=require('./src/models/studentModel')()
var{stdntmModel}=require('./src/models/studentModel');

app.use('/viewAll',viewAllRouter);
app.use('/search',searchRouter);
app.use('/update',updateRouter);

mongoose.connect("mongodb://localhost:27017/mycollegedb")

app.get('/',(req,res)=>{
    res.render('index',
    {
        nav,
        title:'Students'
    });
});

app.route('/save')
    .post((req,res)=>{
    var students=new stdntmModel(req.body)
        students.save((error,data)=>{
            if(error){
                // throw error;
                res.send(error);
                throw error;
            }
            else{
                res.send(data)
            }
        });
    //    res.send(req.body);
});

app.listen(3000,()=>{
    console.log('Listening to Port: '+chalk.blue('3000'));
});