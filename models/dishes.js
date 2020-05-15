const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require ('mongoose-currency').loadType(mongoose);           // will load currency type in mongoose
const Currency = mongoose.Types.Currency;


const commentSchema = new Schema ({
     rating: {
         type: Number,
         min: 1,
         max: 5,
         required: true  
     },
     comment :{
         type : String,
         required: true
     },
     author:{
         type: String,
         required: true
     }
    },{
        timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
},
    description: {
        type: String,
        required: true
 },
    image:{
        type:String,
        required: true
},  

category:{
    type:String,
    required: true
}, 

label:{
    type:String,
    default:''
}, 
price:{
    type:Currency,
    required: true,
    min: 0
},
featured:{
    type: Boolean,
    default: true
},


    comments:[commentSchema]

},{
    timestamps: true  // this will automatically add the created at and updated at 2 timestamps into each
                   //document ie.stored in our application it will updated automatically these values whenever we update the document
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
