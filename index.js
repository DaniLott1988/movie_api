const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/[MovieItDB]', { useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express'),
  morgan = require('morgan');
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Do feel welcome to this app!');
});

app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((error) => {
    console.error(err);
    res.status(500).send('Error ' + error);
  });
});

app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + error);
  });
});

app.get('/directors', (req, res) => {
  res.json(directors);
});

app.get('/directors/:Name', (req, res) => {
  res.json(directors.find((director) => {
    return director.name === req.params.name
  }));
});

app.get('/genres', (req, res) => {
  res.json(genres);
});

app.get('/genres/:Name', (req, res) => {
  res.json(genres.find((genre) => {
    return genre.type === req.params.type
  }));
});

app.get('/users', (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((error) => {
    console.error(err);
    res.status(500).send('Error ' + error);
  });
});

app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + error);
  });
});

app.get('/users/:Username/Favorite_Movies', (req, res) => {
  res.json(users.username.find((favorites) => {
    return user.username.favorite_movies === req.params.favorite_movies
  }));
});

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username})
  .then((user) => {
    if (user) {
    return res.status(400).send(req.body.Username + ' already exists!');
  } else {
    Users
    .create({
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birth_date: req.body.Birth_date
    })
    .then((user) => {res.status(201).json(user) })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error ' + error);
    })
  }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error ' + error);
  });
});

app.post('/users/:Username/movies/:MovieID', (req, res) => {
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

app.put('/users/:Username', (req, res) => {
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
      res.status(500).send('Error ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

app.delete('/users/:Username', (req, res) => {
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

app.delete('/users/:Username/Favorite_Movies', (req, res) => {
  let deleteMovie = req.body;

  if (deleteMovie) {
    const message = "Missing name in request body"
    res.status(400).send(message);
  } else {
    res.send('Deleted! The movie was excluded from your favorites.');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ups! Seems like something\'s gone wrong.');
});

app.listen(8081, () => {
  console.log('Your app is listening on port 8081.');
});
