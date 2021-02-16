const bodyParser = require('body-parser');
const express = require('express');
var morgan = require('morgan');
const app = express();
const port = 3000;



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var routes = require('./routes');
routes(app);

//daftar menu routes index
app.use('/auth', require('./middleware'));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});