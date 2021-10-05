const express = require('express'),
  morgan = require('morgan');
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

app.use(bodyParser.json());

let topTenMovies = [
  {
    id: 1,
    title: 'The Lord of the Rings: The Return of the King',
    director: 'Peter Jackson',
    year: 2003
  },
  {
    id: 2,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson',
    year: 2001
  },
  {
    id: 3,
    title: 'The Lord of the Rings: Two Towers',
    director: 'Peter Jackson',
    year: 2002
  },
  {
    id: 4,
    title: 'V for Vendetta',
    director: 'James McTeigue',
    year: 2005
  },
  {
    id: 5,
    title: 'Red Dragon',
    director: 'Brett Ratner',
    year: 2002
  },
  {
    id: 6,
    title: 'The Silence of the Lambs',
    director: 'Jonathan Demme',
    year: 1991
  },
  {
    id: 7,
    title: '10 Things I Hate About You',
    director: 'Gil Junger',
    year: 1999
  },
  {
    id: 8,
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008
  },
  {
    id: 9,
    title: 'Avengers: Endgame',
    director: 'Russo Brothers',
    year: 2019
  },
  {
    id: 10,
    title: 'O Auto da Compadecida',
    director: 'Guel Arraes',
    year: 2000
  },
];

let directors = [
  {
    id: 01,
    name: 'Peter Jackson',
    year: 1961
  },
  {
    id: 02,
    name: 'James McTeigue',
    year: 1967
  },
  {
    id: 03,
    name: 'Brett Ratner',
    year: 1969
  },
  {
    id: 04,
    name: 'Jonathan Demme',
    year: 1944
  },
  {
    id: 05,
    name: 'Gil Junger',
    year: 1954
  },
  {
    id: 06,
    name: 'Christopher Nolan',
    year: 1970
  },
  {
    id: 07,
    name: 'Russo Brothers',
    year: 1970-71
  },
  {
    id: 08,
    name: 'Guel Arraes',
    year: 1953
  },
];

let users = [
  {
    id: 1001,
    username: 'DLott',
  },
  {
    id: 1002,
    username: 'ABasko',
  },
  {
    id: 1003,
    username: 'GHLott',
  },
  {
    id: 1004,
    username: 'AMpask',
  },
  {
    id: 1005,
    username: 'GabyP',
  },
];

let genres = [
  {
    id: 2001,
    type: 'Romance',
  },
  {
    id: 2002,
    type: 'Adventure',
  },
  {
    id: 2003,
    type: 'Terror',
  },
  {
    id: 2004,
    type: 'Comedy',
  },
  {
    id: 2005,
    type: 'Animation',
  },
];

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
  res.json(directors.find((name) => {
    return director.name === req.params.name
  }));
});

app.get('/genres', (req, res) => {
  res.json(genres);
});

app.get('/genres/:type', (req, res) => {
  res.json(genres.find((type) => {
    return genre.type === req.params.type
  }));
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:username', (req, res) => {
  res.json(users.find((username) => {
    return user.username === req.params.username
  }));
});

app.get('/users/:username/favorites', (req, res) => {
  res.json(users.username.find((favorites) => {
    return user.username.favorites === req.params.favorites
  }));
});

app.post('/users', (req, res) => {
  let newUser = req.body;
  if (!newUse.username) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  };
});

app.post('/users/:username/favorites', (req, res) => {
  let newFavorite = req.body;
  if (!newFavorite.title) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    res.send('New movie was added to the favorites!')
  };
});

app.put('/users/:username', (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username
  });
  if (user) {
    user [req.params.username] = parseInt(req.params.username);
    res.status(201).send('Request completed: User ' + req.params.username + ' changed their username.');
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

app.delete('/users/:username/favorites', (req, res) => {
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
