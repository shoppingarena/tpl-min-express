import express from 'express'

const app = express()



app.get('/', (req, res) => {
    res.send('Welcome Hello World!')
    console.log(`Request object is: ${req.baseUrl}`)
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
    console.log(`Open http://localhost:${PORT} to see the app`)
})
