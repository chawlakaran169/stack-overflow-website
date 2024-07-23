const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const  answerquestionSchema = new Schema({
    description : {
        type : String ,
        required : true 
    }
    
},{timestamps:true });

const AnswerQuestion = mongoose.model('AnswerQuestion', answerquestionSchema);

module.exports = AnswerQuestion;   