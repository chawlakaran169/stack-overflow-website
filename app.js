
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Question = require('./models/Question');
const User = require('./models/UserDetail');
const AnswerQuestion = require('./models/Question');
const profileRouter = require('./routes/profile');

const app = express();
// Replace with your actual MongoDB URI
const dbURI = 'mongodb+srv://karan:k1a2r3a4n5@project2.ynjtxpx.mongodb.net/project?retryWrites=true&w=majority&appName=project2';

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to db');
    })
    .catch((err) => {
        console.error('Connection error:', err);
    });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes

// Render ask question form
app.get('/home/create', (req, res) => {
    res.render('question');
});

app.get('/', (req, res) => {
    res.render('home');
})









app.get('/blogs', (req, res) => {
    Question.find()
        .then((result) => {
            res.render('All-Question', { title: 'questions', questions: result });
        })
        .catch((err) => {
            console.log(err);
        })
});


app.post('/blogs', (req, res) => {
    const newQuestion = new Question(req.body);
    newQuestion.save()
        .then((result) => {
            // Redirect to All Questions page after successful submission
            res.redirect('/blogs');// /blogs to All-question
        })
        .catch((err) => {
            console.error('Save error:', err);
            res.status(500).send('Internal Server Error');
        })
});





app.get('/all-question', (req, res) => {
    res.redirect('/blogs');
})



app.get('/all-question', (req, res) => {
    res.render('All-Question');
})


// app.get('/home',(req,res)=>{
//     res.render('home');
// })


// Signup form route


// Login form route
app.get('/login', (req, res) => {
    res.render('fake');
});


app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/signup/bio', (req, res) => {
    User.find()
        .then((result) => {
            res.render('profile', { details: result });
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/signup/bio', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then((result) => {
            res.redirect('/signup/bio');
        })
        .catch((err) => {
            console.log(err);
        })
});



app.use('/profile',profileRouter);


  


 




app.get('/all-question',(req,res)=>{
    AnswerQuestion.find()
    .then((result)=>{
        res.render('answer-data', {answers :result});
    })
    .catch((err)=>{
        console.log(err);
    })
});


app.get('/answer-to-question',(req,res)=>{
    res.render('answer-post');
});

app.post('/answer',(req,res)=>{
    const answer = new AnswerQuestion(req.body);

    answer.save()
    .then((result)=>{
        res.redirect('/all-question', {answers:result});
    })
    .catch((err)=>{
        console.log(err);
    })
});
app.get('/log-out/home',(req,res)=>{
    res.render('home');
    })

app.get('/signup/home', (req, res) => {
    res.render('welcome');
});

app.get('/question/home', (req, res) => {
    res.render('welcome');
});


app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id);
})

app.delete('/details/:id',(req,res)=>{
const id = req.params.id;

User.findByIdAndDelete(id)
.then((result)=>{
    res.json({ redirect:'/'})
})
.catch((err)=> console.log(err));
})



// 404 Route
app.use((req, res) => {
    res.status(404).render('404');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




