const express       = require('express')
const app           = express()
const routes        = require('./routes')
const PORT          = 3000;
const bodyParser    = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.locals.helper   = require('./helpers')
app.use('/',routes);

app.listen(PORT,() => {
    console.log("application running on port 3000");
})