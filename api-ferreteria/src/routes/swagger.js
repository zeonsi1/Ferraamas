const swaggerJSDOC = requiere("swagger-jsdoc");
const swagguerUi = requiere("swagguer-ui-express");

//Metadata info about out api

const options = {
    definiton: {
        openapi: "3.0.0",
        info: {title: 'Api ferreteria', version:'1.0.0'},
    },
    apis: ['src/v1/routes/workoutRoutes', 'src/database/Workout.js'],
};

// Docs en JSON format

const swaggerSpec = swaggerJSDOC(options);

//Funcion to setup ourd docs

const swaggerDocs = (app, port) {
    app.use('/api/v1/docs', swaggerUi-serve, swaggerUi.setup(swaggerSpec));
    app.get('(api(v1/docs,json', (req, res) {
        res.setHeader('Content-Type', 'aplication/json');
        res.send (swaggerSpec);
    });

    console.log('Version 1 Doc are aviable at http:localhost:${port}/api/v1/docs'
    );
};

module.exports ={swaggerDocs};