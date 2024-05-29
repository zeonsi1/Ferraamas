const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Swagger
const { swaggerDocs: V1SwaggerDocs } = require('./swagger')

const PORT = process.env.PORT || 4000;

app.use(cors());


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`); 
    V1SwaggerDocs(app, PORT);
});
