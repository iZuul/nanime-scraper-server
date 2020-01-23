const app = require('./app')

const port = process.env.PORT || 1234
app.listen(port, () => {
    console.log(`Listening on port ${port}....`)
})