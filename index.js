const express = require('express'),
  morgan = require('morgan');
  bodyParser = require('body-parser'),
  uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Genres = Models.Genre;
const Directors = Models.Director;
const Users = Models.User;

//'mongodb://localhost:27017/[MovieItDB]' <= Local host kept for future tests purposes
mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
const cors = require('cors');
app.use(cors());
app.options('*', cors());
let allowedOrigins = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');
const { check, validationResult } = require('express-validator');

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Do feel welcome to this app!');
});

/**
 * @description Endpoint to get data for all movies.<br>
 * Requires authorization JWT.
 * @method GETAllMovies
 * @param {string} endpoint - /movies
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for all movies. Refer to the 
 *   Genre: { Name: <string>, Description: <string> },    
 *   Director: { Name: <string>, Bio: <string>, Birth: <string>, Death: <string>},    
 *   _id: <string>,   
 *   Title: <string>,   
 *   Description: <string>,   
 *   Featured: <boolean>,   
 *   ImagePath: <string> (uses URL),  
 * ]}
 */

app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((error) => {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

/**
 * @description Endpoint to get data about a single movie, by movie title.<br>
 * Requires authorization JWT.
 * @method GETOneMovie
 * @param {string} endpoint - /movies/:Title
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for one movie. 
 * {
 *   Genre: { Name: <string>, Description: <string> },  
 *   Director: { Name: <string>, Bio: <string>, Birth: <string>, Death: <string>},    
 *   _id: <string>,    
 *   Title: <string>,  
 *   Description: <string>,  
 *   Featured: <boolean>,  
 *   ImagePath: <string> (uses URL),  
 */

app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});



app.get('/directors', passport.authenticate('jwt', { session: false }), (req, res) => {
  Directors.find()
  .then((directors) => {
    res.status(201).json(directors);
  })
  .catch((error) => {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

/**
 * @description Endpoint to get info about a director<br>
 * Requires authorization JWT.
 * @method GETOneDirector
 * @param {string} endpoint - /directors/:Name
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for one director. 
 * { Name: <string>, Bio: <string>, Birth: <string> , Death: <string>}
 */

app.get('/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Directors.findOne({ Name: req.params.Name })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

app.get('/genres', passport.authenticate('jwt', { session: false }), (req, res) => {
  Genres.find()
  .then((genres) => {
    res.status(201).json(genres);
  })
  .catch((error) => {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

/**
 * @description Endpoint to get info about a genre<br>
 * Requires authorization JWT.
 * @method GETOneGenre
 * @param {string} endpoint - /genres/:Name
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for one genre. 
 * { Name: <string>, Description: <string> }
 */

app.get('/genres/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
    res.json(genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

/*
 * @description Endpoint to get data for all users.<br>
 * Requires authorization JWT.
 * @method GETAllUsers
 * @param {string} endpoint - /users
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for all users. 
 * {[  _id: <string>,   
 *     Username: <string>,   
 *     Password: <string> (hashed),   
 *     Email: <string>,  
 *     Birth_date: <string>  
 *     Favorite_Movies: [<string>]  
 * ]}
*/

app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((error) => {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

app.post('/users', [
  check('Username', 'Username is required').not().isEmpty(),
  check('Username', 'Username contains non alphanumeric characters - which is not allowed.').isAlphanumeric(),
  check('Password', 'Password is required to have a minimum length of 9 characters.').isLength({min: 9}),
  check('Email', 'Email does not appear to be in a valid format.').isEmail()
], (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username})
  .then((user) => {
    if (user) {
    return res.status(400).send(req.body.Username + ' already exists!');
  } else {
    Users
    .create({
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birth_date: req.body.Birth_date
    })
    .then((user) => {res.status(201).json(user) })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    })
  }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, {
    $push: { Favorite_Movies:req.params.MovieID }
  },
  { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

/**
 * @description Endpoint to update users info<br>
 * Requires authorization JWT.
 * @method PUTUpdateUser
 * @param {string} endpoint - /users/:ID
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @param {req.body} object - The HTTP body must be a JSON object formatted as below (all fields are optional):<br>
 * {<br>
 * "Username": "testuser",<br>
 * "Password": "Amarelinha1",<br>
 * "Email" : "testuser@gmail.com",<br>
 * "Birth_date" : "1999-11-11"<br>
 * }
 * @returns {object} - JSON object containing updated user data. 
 * { _id: <string>,   
 *   Username: <string>,   
 *   Password: <string> (hashed),   
 *   Email: <string>,  
 *   Birth_date: <string>  
 *   Favorite_Movies: [<string>]  
 * }
 */

app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {$set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birth_date: req.body.Birth_date
    }
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

/**
 * @description Endpoint to delete a user's account by username<br>
 * Requires authorization JWT.
 * @method DELETEUserAccount
 * @param {string} endpoint - /users/:Username
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {string} - A string containing the message: "<Username> was deleted properly deleted"
 */

app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found.')
    } else {
      res.status(200).send('User ' + req.params.Username + ' was properly deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

/**
 * @description Endpoint to remove a movie from Watchlist by id <br>
 * Requires authorization JWT.
 * @method DELETERemoveFavoriteMovie
 * @param {string} endpoint - /users/movies/:MovieID
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing updated user data. 
 * { _id: <string>,   
 *   Username: <string>,   
 *   Password: <string> (hashed),   
 *   Email: <string>,  
 *   Birth_date: <string>  
 *   Favorite_Movies: [<string>]  
 * }  
 */

app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, {
    $pull: { Favorite_Movies:req.params.MovieID }
  },
  { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ups! Seems like something\'s gone wrong.');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Your app is listening on Port ' + port + '.');
});
