const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const  questionSchema = new Schema({
    title: {
        type : String ,
        required: true 
    },
    description :{
type: String , 
required : true 
    },
    related:{
        type : String , 
        required:true
    }
},{timestamps:true });




const Question = mongoose.model('Question', questionSchema);


module.exports= Question;



