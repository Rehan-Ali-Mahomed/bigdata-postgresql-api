const express = require('express');
const app = express();
const port = 8080;
const Pool = require('pg').Pool;

// Define the middleware to use to parse url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define the PostgreSQL DB
const pool = new Pool({
  user: 'admin',
  host: 'postgresql_db',
  database: 'postgres',
  password: 'adminadmin',
  port: 5432
});

// Define the queries of each methods
const getFilms = (request, response) => {
  console.log("Retrieving all films");
  
  pool.query('SELECT * FROM film ORDER BY title ASC', (error, results) => {
    if (error) {
      console.log("An error occured : ", error);
      response.status(500).send("An error occured while trying to get all films from database");
    }
    response.status(200).json(results.rows)
  })
};

const getFilmById = (req, res) => {
  const id = parseInt(req.params.id);
  
  if(id == undefined) { res.status(404).send("ID not found") }
  
  console.log("Retrieving film with ID :",id);

  pool.query('SELECT * FROM film WHERE film_id = $1', [id], (error, results) => {
    if (error) {
      console.log("An error occured : ", error);
      res.status(500).send("An error occured while trying to get film with id :" + id);
    }
    console.log("Result rows :", results.rowCount);
    if(results.rowCount == 0){
      let message = `Film with ID ${id} not found.`;
      console.log(message);
      res.status(404).send(message);
    } else {
      res.status(200).json(results.rows)
    }
  })
  
}

const addFilm = (req, res) => {
  const { name, description } = req.body;
  
  if(name == undefined || description == undefined) return res.status(404).send("Missing required parameters");

  console.log("Adding film :"+ name);
  pool.query('INSERT INTO film (title, description, language_id) VALUES ($1, $2, 1) RETURNING *', [name, description], (error, results) => {
    if (error) {
      console.log("An error occured : ", error);
      res.status(500).send("An error occured while trying to add film to database");
    }
    res.status(201).send(`Film added with ID: ${results.rows[0].film_id}`)
  })
}

// Define methods available through the API
app.get("/films", getFilms);
app.get("/films/:id", getFilmById); 
app.post("/films", addFilm);

// Launch the app and open the port
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
