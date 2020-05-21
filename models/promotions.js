const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require ('mongoose-currency').loadType(mongoose);       
const Currency = mongoose.Types.Currency;

const promotionsSchema = new Schema ({
name: {
    type: String,
    required: true,
    unique: true
},

image : {
    type: String,
    required: true,
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
description: {
    type: String,
    required: true
},
//comments:[commentSchema]

},{
    timestamps: true  // this will automatically add the created at and updated at 2 timestamps into each
                   //document ie.stored in our application it will updated automatically these values whenever we update the document
});

var Promotions = mongoose.model('Promotion', promotionsSchema);

module.exports = Promotions;
