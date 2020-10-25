const PORT_EXPRESS = 7070
import express, {Request, Response} from 'express'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import routes from './routes'

const app: express.Application = express()

app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(morgan('[:date[iso]] :req[origin] :method :url :status :response-time ms'))

app.use('/', routes)

app.use((req: Request, res: Response) => res.status(404).send('Not found'))

app.listen(PORT_EXPRESS, () => {
    console.log("Server listening to ", PORT_EXPRESS)
})


export default app
