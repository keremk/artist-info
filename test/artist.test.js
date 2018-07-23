const artistHelper = require('../src/artist');

const artists = {
  "2": {
    "name": "Mark Hamill",
    "gender": 2,
    "profilePath": "/fk8OfdReNltKZqOk2TZgkofCUFq.jpg",
    "movies": [11, 181808]
  },
  "3": {
    "name": "Harrison Ford",
    "gender": 2,
    "profilePath": "/7LOTdRfHU1H1qHBxpUv3jT04eWB.jpg",
    "movies": [78, 335984, 140607, 11]
  },
  "4": {
    "name": "Carrie Fisher",
    "gender": 1,
    "profilePath": "/oVYiGe4GzgQkoJfdHg8qKqEoWJz.jpg",
    "movies": [140607, 11, 181808]
  }
}

test('returns the correct movie info for an existing movieId', () => {
  const artistId = "2"
  const response = artistHelper.createArtistInfo(artists, artistId);

  expect(response).toEqual({
    "id": "2",
    "name": "Mark Hamill",
    "gender": "Male",
    "profilePath": "https://image.tmdb.org/t/p/w185/fk8OfdReNltKZqOk2TZgkofCUFq.jpg",
    "movies": [11, 181808]
  });
});

test('if artistId does not exist, we get an exception', () => {
  const artistId = 0
  
  expect( () =>  artistHelper.createArtistInfo(artists, artistId)).toThrowError(Error);
});
