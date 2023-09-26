const express = require('express');
const app = express();
const port = 5000;
const Pool = require('pg').Pool;

// Define the PostgreSQL DB
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'postgres',
  password: 'adminadmin',
  port: 5432
});

// Define the queries of each methods
const getfilms = (request, response) => {
	console.log("Request received on /films");
  pool.query('SELECT * FROM film ORDER BY title ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

// Define methods available through the API
app.get("/films", getfilms);

// Launch the app and open the port
app.use(express.json());
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
