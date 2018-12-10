const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'pug');
app.set('views','./views');

let issues = [
    {"id": 0, "createdDate": "2018-12-06", "description": "Default", "severity":"minor", "status":"open", "resolvedDate":"2018-12-06"}
];
app.use(express.json());

app.get('/', (req,res)=> {
    res.render('index', {title:'Issue Tracker'});
});

app.get('/issues', (req,res)=> {
    //res.send(issues);
    res.render('view-issues', {title:'Issue Tracker', issues: issues});
});

app.get('/add-issue', (req,res)=> {
    res.render('add-issue', {title:'Issue Tracker'});
});

// app.get('/issues/:id', (req,res)=> {
//     const issue = issues.find(c => c.id == req.params.id);
//     if(!issue) return res.status(404).send("<h3>No issues are found for the given id.</h3>")
//     res.send(issue);
// });


app.get('/update/:id', (req,res)=> {
    const issue = issues.find(c => c.id == req.params.id);
    if(!issue) return res.status(404).send("<h3>No issues are found for the given id.</h3>")
    res.render('update',{ title:'Issue Tracker', issue: issue });
});

app.get('/*', (req,res)=> {
    res.status(400).send(`<h1>Bad Request</h1>`);
});

app.post('/add-issue', (req,res)=> {
    const issue = { "id": issues.length,
        "createdDate": req.body.createdDate,
        "description": req.body.description,
        "severity":req.body.severity,
        "status":req.body.status,
        "resolvedDate":req.body.resolvedDate
    };
    issues.push(issue);
    res.redirect('/issues');
});

app.post('/update/:id',(req,res)=>{
    const issue = issues.find(c => c.id == req.params.id);
    if(!issue) return res.status(404).send("<h3>No issues are found for the given id.</h3>")
    issue.createdDate = req.body.createdDate;
    issue.description = req.body.description;
    issue.severity = req.body.severity;
    issue.status = req.body.status;
    issue.resolvedDate = req.body.resolvedDate;
    // res.send(issue);
    res.redirect('/issues');
})

app.post('/issues/:id',(req,res)=>{
    const issue = issues.find(c => c.id == req.params.id);
    if(!issue) return res.status(404).send("<h3>No issues are found for the given id.</h3>")

    const index = issues.indexOf(issue);
    issues.splice(index, 1);
    // res.send(issue);
    res.redirect('/issues');
})

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server is listening on port ${port}....`);