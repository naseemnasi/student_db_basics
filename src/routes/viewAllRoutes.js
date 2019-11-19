const express = require('express');
const viewAllRouter = express.Router();
var{stdntmModel}=require('../models/studentModel')




function router(nav){
    var students = [
        {
            name:'Naseem',
            rollNo:1,
            admno:123,
            college:'HICET, CBE'
        },
        {
            name:'Midhun',
            rollNo:2,
            admno:124,
            college:'HICET, CBE'
        },
        {
            name:'Sajith',
            rollNo:3,
            admno:125,
            college:'HICET, CBE'
        }
        
    ];

    viewAllRouter.route('/')
        .get((req,res)=>{
            res.render(
                'viewAll',
                {
                    nav,
                    title:"View All",
                    students
                }
            );
        }
    );
    viewAllRouter.get('/viewAllapi',(req,res)=>{
        stdntmModel.find((error,data)=>{
            if(error){
                throw error;
            }
            else{
                res.send(data);
            }
        })
    })
    
    
    return viewAllRouter;
}

module.exports = router;
