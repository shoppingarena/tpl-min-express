import express from 'express'

const app = express()


app.get('/', (req, res) => {
    res.send('Hello World!')
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
    console.log(`Open http://localhost:${PORT} to see the app`)
})
