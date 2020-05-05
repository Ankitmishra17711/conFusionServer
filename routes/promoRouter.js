const express=require('express');
const bodyParser =require('body-parser');//2

const promoRouter =express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

//.all( (req,res,next) =>{
  //res.statusCode=200;
  //res.setHeader('Content-type','text/plain');
  //next();
//})


.get((req,res,next)=>{
  res.end('will send all the promotions to you!');
  })
  
  .post((req,res,next)=>{ // post will add info in rquest body in the form of a json string which contain a name and description
    console.log(req.body);
    res.end('will add the promotions :' + req.body.name +
    'with details:'+ req.body.description);
  })
  
  .put((req,res,next)=>{ 
    res.statusCode=403; // 403 means operation is not supported
    res.end('Put operation not supported on /promotions');
  })
  
  
  .delete((req,res,next)=>{
    res.end('Deleting all the promotions to you !');
    });





    promoRouter.route('/:promoId')

    .get((req, res, next)=> {

      console.log('hi ankit');
      res.end('will send details of the promotions'   //.get(function (req, res, next) 
      +req.params.promoId +'to you');
      })

      
      
      .post((req,res,next)=>{ // post will add info in rquest body in the form of a json string which contain a name and description
        res.statusCode=403; // 403 means operation is not supported
        res.end('POST operation not supported on /promotions/'
        +req.params.promoId);
      })
     
      
      
      .put((req,res,next)=>{ 
        
        res.write('updating the promotions:'+req.params.promoId +'\n');
        res.end('will update the promotions :'+req.body.name+
        'with details:' +req.body.description);
      })
      
      
      .delete((req,res,next)=>{
        res.end('Deleting promotions :'+req.params.promoId);
        });
  


      module.exports = promoRouter;