const express = require('express');
const app = express();

//swagger
const {swaggerDocs: V1swaggerDocs} = require ('./v1/swagger');
const { swaggerDocs } = require('./routes/swagger');


// middlewares
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
});
  
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index'));

app.listen(4000);
console.log('Server on port 4000'); 

app.listen(PORT, {
    console.log('Server listening on port ${PORT}');
    V1swaggerDocs(app, PORT);
});