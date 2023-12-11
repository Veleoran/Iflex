import axios from 'axios';

const tmdbApiKey = process.env.TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

// Fonction du contrôleur pour obtenir les détails d'un film
export async function getMovieDetails(req, res) {
  try {
    const response = await axios.get(`${baseUrl}/movie/${req.params.tmdbId}`, {
      params: { api_key: tmdbApiKey }
    });
    res.render('movie', { movie: response.data }); // Assurez-vous d'avoir un template PUG 'movie'
  } catch (error) {
    console.error('Error fetching data from TMDb:', error);
    res.status(404).send('Movie not found');
  }
}
