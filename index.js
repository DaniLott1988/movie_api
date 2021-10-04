const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

let topTenMovies = [
  {
    title: 'The Lord of the Rings: The Return of the King',
    director: 'Peter Jackson',
    year: 2003
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson',
    year: 2001
  },
  {
    title: 'The Lord of the Rings: Two Towers',
    director: 'Peter Jackson',
    year: 2002
  },
  {
    title: 'V for Vendetta',
    director: 'James McTeigue',
    year: 2005
  },
  {
    title: 'Red Dragon',
    director: 'Brett Ratner',
    year: 2002
  },
  {
    title: 'The Silence of the Lambs',
    director: 'Jonathan Demme',
    year: 1991
  },
  {
    title: '10 Things I Hate About You',
    director: 'Gil Junger',
    year: 1999
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008
  },
  {
    title: 'Avengers: Endgame',
    director: 'Russo Brothers',
    year: 2019
  },
  {
    title: 'O Auto da Compadecida',
    director: 'Guel Arraes',
    year: 2000
  },
];

app.get('/', (req, res) => {
  res.send('Do feel welcome to this app!');
});

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ups! Seems like something\'s gone wrong.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
