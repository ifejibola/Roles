const express = require('express')
const app = express()
const { users, ROLE } = require('./data')
const projectRouter = require('./routes/projects')
const { authUser, authRole } = require('./basicAuth');
const fetch = require("node-fetch");

app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page')
})
app.get('/blog', async (req, res) => {
    // console.log(res);
    let va;
    let dt = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            va = json
            console.log('va: ', va)
            return va;
        })
    dt = JSON.stringify(dt)
    console.log('dt: ', dt)
    console.log('va2: ', va)
    res.send(dt)
})

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin Page')
})

function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
        req.user = users.find(user => user.id === userId)
    }
    next()
}

app.listen(5848)