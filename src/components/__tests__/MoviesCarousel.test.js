import 'react-native';
import React from 'react';
import { render } from '../../utils/Tests';
import MoviesCarousel from '../MoviesCarousel';

const carouselData = {
  genreTitle: 'Action',
  data: [
    {
      backdrop:
        'https://wookie.codesubmit.io/static/backdrops/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg',
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      classification: '13+',
      director: 'Christopher Nolan',
      genres: ['Action', 'Crime', 'Drama'],
      id: 'd6822b7b-48bb-4b78-ad5e-9ba04c517ec8',
      imdb_rating: 9,
      length: '2h 32min',
      overview:
        'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
      poster:
        'https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg',
      released_on: '2008-07-16T00:00:00',
      slug: 'the-dark-knight-2008',
      title: 'The Dark Knight',
    },
    {
      backdrop:
        'https://wookie.codesubmit.io/static/backdrops/4d949e14-b08b-47fb-bab0-22c732dbedf3.jpg',
      cast: ['Harrison Ford', 'Karen Allen', 'Paul Freeman'],
      classification: '7+',
      director: 'Steven Spielberg',
      genres: ['Action', 'Adventure'],
      id: '4d949e14-b08b-47fb-bab0-22c732dbedf3',
      imdb_rating: 8.5,
      length: '1h 55min',
      overview:
        'When Dr. Indiana Jones – the tweed-suited professor who just happens to be a celebrated archaeologist – is hired by the government to locate the legendary Ark of the Covenant, he finds himself up against the entire Nazi regime.',
      poster:
        'https://wookie.codesubmit.io/static/posters/4d949e14-b08b-47fb-bab0-22c732dbedf3.jpg',
      released_on: '1981-06-12T00:00:00',
      slug: 'raiders-of-the-lost-ark-1981',
      title: 'Raiders of the Lost Ark',
    },
    {
      backdrop:
        'https://wookie.codesubmit.io/static/backdrops/9a70e529-9070-4a2f-963c-c5bb253cc721.jpg',
      cast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'],
      classification: '13+',
      director: ['Anthony Russo', 'Joe Russo'],
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      id: '9a70e529-9070-4a2f-963c-c5bb253cc721',
      imdb_rating: 8.5,
      length: '2h 29min',
      overview:
        'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.',
      poster:
        'https://wookie.codesubmit.io/static/posters/9a70e529-9070-4a2f-963c-c5bb253cc721.jpg',
      released_on: '2018-04-25T00:00:00',
      slug: 'avengers-infinity-war-2018',
      title: 'Avengers: Infinity War',
    },
    {
      backdrop:
        'https://wookie.codesubmit.io/static/backdrops/f3d91837-a2ff-4250-99b0-e8c9c036a23a.jpg',
      cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld'],
      classification: '7+',
      director: ['Bob Persichetti', 'Peter Ramsey', 'Rodney Rothman'],
      genres: ['Animation', 'Action', 'Adventure'],
      id: 'f3d91837-a2ff-4250-99b0-e8c9c036a23a',
      imdb_rating: 8.5,
      length: '1h 57min',
      overview:
        'Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson "Kingpin" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.',
      poster:
        'https://wookie.codesubmit.io/static/posters/f3d91837-a2ff-4250-99b0-e8c9c036a23a.jpg',
      released_on: '2018-12-06T00:00:00',
      slug: 'spider-man-into-the-spider-verse-2018',
      title: 'Spider-Man: Into the Spider-Verse',
    },
    {
      backdrop:
        'https://wookie.codesubmit.io/static/backdrops/8de5e9be-ec40-4687-9b01-be1af3ace1d7.jpg',
      cast: ['Christian Bale', 'Michael Caine', 'Ken Watanabe'],
      classification: '13+',
      director: 'Christopher Nolan',
      genres: ['Action', 'Adventure'],
      id: '8de5e9be-ec40-4687-9b01-be1af3ace1d7',
      imdb_rating: 8.2,
      length: '2h 20min',
      overview:
        'Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.',
      poster:
        'https://wookie.codesubmit.io/static/posters/8de5e9be-ec40-4687-9b01-be1af3ace1d7.jpg',
      released_on: '2005-06-10T00:00:00',
      slug: 'batman-begins-2005',
      title: 'Batman Begins',
    },
    {
      backdrop:
        'https://wookie.codesubmit.io/static/backdrops/2dfccc2c-42cc-4a06-81a7-8d1da3284283.jpg',
      cast: ['Harrison Ford', 'Sean Connery', 'Alison Doody'],
      classification: '13+',
      director: 'Steven Spielberg',
      genres: ['Action', 'Adventure'],
      id: '2dfccc2c-42cc-4a06-81a7-8d1da3284283',
      imdb_rating: 8.2,
      length: '2h 7min',
      overview:
        "When Dr. Henry Jones Sr. suddenly goes missing while pursuing the Holy Grail, eminent archaeologist Indiana must team up with Marcus Brody, Sallah and Elsa Schneider to follow in his father's footsteps and stop the Nazis from recovering the power of eternal life.",
      poster:
        'https://wookie.codesubmit.io/static/posters/2dfccc2c-42cc-4a06-81a7-8d1da3284283.jpg',
      released_on: '1989-05-24T00:00:00',
      slug: 'indiana-jones-and-the-last-crusade-1989',
      title: 'Indiana Jones and the Last Crusade',
    },
  ],
};
describe('<MoviesCarousel />', () => {
  it('should render correctly', () => {
    const onMovieClickFn = jest.fn();
    const { getAllByTestId, getByText } = render(
      <MoviesCarousel
        data={carouselData.data}
        genreTitle={carouselData.genreTitle}
        onMovieClick={onMovieClickFn}
      />
    );
    const genreTitle = getByText(carouselData.genreTitle);
    const moviesCard = getAllByTestId('movie-card');

    expect(genreTitle).toBeDefined();
    expect(moviesCard.length).toBe(6);
  });
});
