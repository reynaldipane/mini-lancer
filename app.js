const express       = require('express')
const app           = express()
const routes        = require('./routes')
const PORT          = 3000;
const bodyParser    = require('body-parser')
const session       = require('express-session')

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.locals.helper   = require('./helpers')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'mini lancer',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use('/',routes);

app.listen(PORT,() => {
    console.log("application running on port 3000");
})