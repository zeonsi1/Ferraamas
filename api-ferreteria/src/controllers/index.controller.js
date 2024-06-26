const axios = require('axios');
const { Pool } = require('pg');
const { WebpayPlus } = require('transbank-sdk');

WebpayPlus.configureForTesting();

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'duoc',
    database: 'ferreteria',
    port: '5432'
});

const fechaActual = new Date();

const anno = fechaActual.getFullYear();
const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
const dia = String(fechaActual.getDate()).padStart(2, '0');

const postUsers = async(req, res) =>{
    const {email, password} = req.body;

    const query = {
        text: 'SELECT id_tipo_user, pnombre_user FROM users WHERE email = $1 AND password = $2',
        values: [email, password]
    }

    try {
        const response = await pool.query(query);
        if (response.rows.length > 0) {          
          res.status(200).json(response.rows);
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }

    } catch (error) {
        console.error('Error al ejecutar la consulta: ', error);
        res.status(500).json({ error: 'Error al ejecutar la consulta' });
    }
    
};

const getProducts = async(req, res) => {
    try {
        const response = await pool.query('SELECT * FROM productos');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener la lista de productos: ', error);
        res.status(500).json({ error: 'Error al obtener la lista de productos' });
    }
};

const postProducts = async(req, res) => {
    divisa = req.body.divisa;
    fecha = `${anno}-${mes}-${dia}`;
    let resp = ''; 
    let valor = 0;
    let precio = 0;

    const response = await pool.query('SELECT precio_producto FROM productos');

    switch (divisa){
        case 'CLP':
            res.status(200).json(response.rows);
            break;
        case 'EUR':
            resp = await axios.get(`https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=ferraamas@gmail.com&pass=Duoc123&firstdate=${fecha}&timeseries=F072.CLP.EUR.N.O.D&function=GetSeries`);
            valor = resp.data.Series.Obs[0].value;
            for (let i in response.rows){                
                precio = response.rows[i].precio_producto;
                precio = Math.round(precio / valor);
                response.rows[i].precio_producto = precio;
            }            
            res.status(200).json(response.rows);
            break;
        case 'USD':
            resp = await axios.get(`https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=ferraamas@gmail.com&pass=Duoc123&firstdate=${fecha}&timeseries=F073.TCO.PRE.Z.D&function=GetSeries`);
            valor = resp.data.Series.Obs[0].value;
            for (let i in response.rows){                
                precio = response.rows[i].precio_producto;
                precio = Math.round(precio / valor);
                response.rows[i].precio_producto = precio
            }
            res.status(200).json(response.rows);    
            break;
    }
}

const getUsers = async(req, res) => {
    try {
        const response = await pool.query('SELECT u.id, u.pnombre_user, u.email, u.password, tu.nombre_tipo_user FROM users u JOIN tipo_user tu ON u.id_tipo_user = tu.id_tipo_user ORDER BY u.id');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener la lista de usuarios: ', error);
        res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
}

const postWebpay = async(req, res) => {
    const { total: amount } = req.body;
    sessionId = '1';
    returnUrl = 'http://localhost:4000/webpay-return';
    let buyOrder = 'Herramientas';
    divisa= req.body.divisaType;
    
    try{
        const createResponse = await (new WebpayPlus.Transaction()).create(
            buyOrder, 
            sessionId, 
            amount, 
            returnUrl
          );
        res.status(200).json(createResponse);
    }catch (error){
        console.error('no funca', error);
    }
}

const getWebpayReturn = async(req, res) => {
    const token_ws = req.query.token_ws;
    const tx = new WebpayPlus.Transaction();

    if (!token_ws) {
        return res.status(400).json({ error: 'token_ws es requerido' });
    }
    try {
        const commitResponse = await tx.commit(token_ws);
        res.json(commitResponse);
    } catch (error) {
        console.error('Error handling Webpay return: ', error);
        res.status(500).json({ error: 'Error handling Webpay return' });
    }
}

const postCreateUser = async(req, res) => {
    const {email: email, pnombre: pnombre, password: password} = req.body
    
    try{
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(existingUser.rows.length > 0) {
            return res.status(400).json({error: 'El Email esta en uso'});
        }

        await pool.query('INSERT INTO users (pnombre_user, email, password, id_tipo_user) VALUES ($1, $2, $3, 3)', [pnombre, email, password])
        res.status(201).json({ message: 'Usuario creado con éxito' })
    }catch(error){
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear el usuario. Inténtalo de nuevo más tarde.' });
    }
}

module.exports = {
    postUsers,
    getProducts,
    postProducts,
    getUsers,
    postWebpay,
    getWebpayReturn,
    postCreateUser
}