const express = require('express');
const app = express();

// Swagger
const { swaggerDocs: V1SwaggerDocs } = require('./swagger')

const PORT = process.env.PORT || 4000;

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

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`); 
    V1SwaggerDocs(app, PORT);
});
