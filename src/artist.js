// Response resolvers
const createArtistInfo = (artists, artistId) => {
  const resolveGender = genderId => {
    switch (genderId) {
      case 1: 
        return "Female";
      case 2:
        return "Male";
      default:
        return "Unspecified";
    } 
  }
  const artist = artists[artistId];
  
  if (typeof artist == 'undefined') {
    throw Error(`ArtistId ${artistId} is unknown`);
  } else {
    return {
      id: artistId,
      name: artist.name,
      profilePath: `https://image.tmdb.org/t/p/w185${artist.profilePath}`,
      gender: resolveGender(artist.gender),
      movies: artist.movies
    }
  }
};

module.exports = {
  createArtistInfo: createArtistInfo
}