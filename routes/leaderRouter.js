const express=require('express');
const bodyParser =require('body-parser'); /// 1

const leaderRouter =express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.all( (req,res,next) =>{
 res.statusCode=200;
 res.setHeader('Content-type','text/plain');
  next();
})


.get((req,res,next)=>{
  
  res.end('will send all the leaders to you!');
  })
  
  .post((req,res,next)=>{ // post will add info in rquest body in the form of a json string which contain a name and description
    console.log(req.body);
    res.end('will add the leaders :' + req.body.name +
    'with details:'+ req.body.description);
  })
  
  .put((req,res,next)=>{ 
    res.statusCode=403; // 403 means operation is not supported
    res.end('Put operation not supported on /leaders');
  })
  
  .delete((req,res,next)=>{
    res.end('Deleting all the leaders to you !');
    });






    leaderRouter.route('/:leaderId')

    .get((req, res, next)=> {
     // console.log('hii ankit mishra');
      res.end('will send details of the leader'   //.get(function (req, res, next) 
      +req.params.leaderId +'to you');
      })

      
      
      .post((req,res, next)=> { // post will add info in rquest body in the form of a json string which contain a name and description
        res.statusCode=403; // 403 means operation is not supported
        res.end('POST operation not supported on /leaders/'
        +req.params.leaderId);
      })
     
      
      
      .put((req,res,next)=>{ 
        res.write('updating the leader:'+req.params.leaderId +'\n');
        res.end('will update the leader :'+req.body.name+
        'with details:' +req.body.description);
      })
      
      
      .delete((req,res,next)=>{
        res.end('Deleting dish :'+req.params.lederId);
        });
  

 module.exports = leaderRouter;