const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
//file include//
// const file=require('./Server/helper/uploads')

const db=require('./Server/core');
const apiServer=require('./Server/index');

const app=express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//app.use(express.static('./Server/helper/uploads'));


app.use(express.static(__dirname+'/Server/helper/uploads'));


app.use('/',apiServer.api);

app.use(function(req,res,next){
    res.status(404).json({status:'Page Not Found'}).end();
})

app.set('port',db.config.port);

const server=app.listen(app.get('port'),function(){
    console.log("Express Listening Port:"+server.address().port);
});
