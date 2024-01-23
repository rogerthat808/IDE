import express from "express";
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(logger)

const users = [];

app.get('/users', async (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send("Post Successful")
    } catch {
        res.status(500).send("Post Failed")
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Login Success')
        } else {
            res.send('Not allowed')
        }
    } catch {
        res.status(500).send()
    }
})













function logger(req, res, next) {
    console.log('Request URL: ', req.url)
    console.log('Request method: ', req.method)
    next()
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))