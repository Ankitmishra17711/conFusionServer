const express=require('express');
const bodyParser =require('body-parser'); /// 1

const dishRouter =express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')

.all( (req,res,next) =>{
 res.statusCode=200;
 res.setHeader('Content-type','text/plain');
  next();
})


.get((req,res,next)=>{
  
  res.end('will send all the dishes yo you!');
  })
  
  .post((req,res,next)=>{ // post will add info in rquest body in the form of a json string which contain a name and description
    console.log(req.body);
    res.end('will add the dish :' + req.body.name +
    'with details:'+ req.body.description);
  })
  
  .put((req,res,next)=>{ 
    res.statusCode=403; // 403 means operation is not supported
    res.end('Put operation not supported on /dishes');
  })
  
  .delete((req,res,next)=>{
    res.end('Deleting all the dishes to you !');
    });






    dishRouter.route('/:dishId')

    .get((req, res, next)=> {
      console.log('hii ankit mishra');
      res.end('will send details of the dish'   //.get(function (req, res, next) 
      +req.params.dishId +'to you');
      })

      
      
      .post((req,res, next)=> { // post will add info in rquest body in the form of a json string which contain a name and description
        res.statusCode=403; // 403 means operation is not supported
        res.end('POST operation not supported on /dishes/'
        +req.params.dishId);
      })
     
      
      
      .put((req,res,next)=>{ 
         res.write('updating the dish:'+req.params.dishId +'\n');
       
        res.end('will update the dish :'+req.body.name+
        'with details:' +req.body.description);
      })
      
      
      .delete((req,res,next)=>{
        res.end('Deleting dish :'+req.params.dishId);
        });
  

 module.exports = dishRouter;