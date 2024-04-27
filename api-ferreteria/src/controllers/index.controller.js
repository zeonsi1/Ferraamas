const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'duoc',
    database: 'ferreteria',
    port: '5432'
});

const postUsers = async (req, res) =>{
    const {email, password} = req.body;
    console.log(email)
    console.log(password)

    const query = {
        text: 'SELECT id_tipo_user FROM users WHERE email = $1 AND password = $2',
        values: [email, password]
    }

    try {
        const response = await pool.query(query);
        console.log(response.rows);
        if (response.rows.length > 0) {
          // User found, send appropriate response (e.g., token)
          res.status(200).json(response.rows); // Replace with your logic
        } else {
          res.status(401).json({ error: 'Invalid email or password' }); // Unauthorized
        }

    } catch (error) {
        console.error('Error al ejecutar la consulta: ', error);
        res.status(500).json({ error: 'Error al ejecutar la consulta' });
    }
    
};

const getProducts = async (req, res) => {
    const response = await pool.query('SELECT * FROM productos');
    res.status(200).json(response.rows);
};

module.exports = {
    postUsers,
    getProducts
}