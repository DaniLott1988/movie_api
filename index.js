const express = require('express'),
  morgan = require('morgan');
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Do feel welcome to this app!');
});

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

app.get('/movies/:title', (req, res) => {
  res.json(topTenMovies.find((movie) => {
    return movie.title === req.params.title
  }));
});

app.get('/directors', (req, res) => {
  res.json(directors);
});

app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) => {
    return director.name === req.params.name
  }));
});

app.get('/genres', (req, res) => {
  res.json(genres);
});

app.get('/genres/:name', (req, res) => {
  res.json(genres.find((genre) => {
    return genre.type === req.params.type
  }));
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:username', (req, res) => {
  res.json(users.find((user) => {
    return user.username === req.params.username
  }));
});

app.get('/users/:username/favorite_movies', (req, res) => {
  res.json(users.username.find((favorites) => {
    return user.username.favorite_movies === req.params.favorite_movies
  }));
});

app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

app.post('/users/:username/favorite_movies', (req, res) => {
  let newFavorite = req.body;
  if (!newFavorite.title) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    res.send('New movie was added to the favorites!')
  }
});

app.put('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user[req.params.username] = parseInt(req.params.username);
    res.status(201).send('Request completed: User ' + req.params.username + ' changed their username.);
  } else {
    res.status(404).send('User ' + req.params.username + ' was not found.');
  }
});

app.delete('/users/:id', (req, res) => {
  let user = users.find((user) => {
    return user.id === req.params.id
  });
  if (user) {
    users = users.filter((obj) => {
    return obj.id !== req.params.id
  });
    res.status(201).send('User ' + req.params.id + ' was properly deleted.');
  }
});

app.delete('/users/:username/favorite_movies', (req, res) => {
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
