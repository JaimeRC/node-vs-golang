const PORT_EXPRESS = 7070
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'

const app: express.Application = express()

app.use(helmet())
app.use(compression())

app.listen(PORT_EXPRESS, () => {
    console.log("Server listening to ", PORT_EXPRESS)
})
