

const express = require('express');
const path = require('path');
const hbs = require('hbs')
const fs = require('fs');


const app = express();
const port = 3000;


app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.urlencoded({ extended : true }));

const dataPath = path.join(__dirname, 'data', 'polls.json');

function readPolls() {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};

function savePolls(polls) {
   return fs.writeFileSync(dataPath, JSON.stringify(polls));
}


app.get('/', (req,res) => {
    const polls = readPolls();
    res.render('main', { polls });
});

app.get('/poll/:id', (req,res) => {
    const polls = readPolls();
    const poll = polls.find(poll => poll.id === req.params.id );

    if (poll){
        res.render('poll', { poll });
    } else {
        res.send('Poll not found!')
    }
});

app.post('/vote/:id', (req, res) => {
    const polls = readPolls();
    const pollId = Number(req.params.id);
    const index = Number(req.body.option);

    const poll = polls.find(poll => Number(poll.id) === pollId);

    if (poll && poll.votes[index] !== undefined) {
        poll.votes[index]++;
        savePolls(polls);
        res.redirect(`/results/${pollId}`);
    } else {
        res.status(404).send('Poll not found!')
    }

});




app.get('/results/:id', (req,res) => {
    const polls = readPolls();
    const poll = polls.find(poll => poll.id === req.params.id);



    if (poll){
        res.render('results', { poll });
    } else {
        res.send('Poll results are not available!')
    }
})


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port} ...`);
})

