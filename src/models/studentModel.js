const mongoose=require('mongoose')

var stdntmModel=mongoose.model('studentcollect',{
    sname:String,
    rollno:Number,
    admno:Number,
    college:String

})
module.exports={stdntmModel}