import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { connect } from '../index';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(addMovies(data));
  }
  isMovieFavourite = (movie) => {
    const { movies } = this.props; // {movies:{}, search:{}}
    const { favourites } = movies;
    const index = favourites.indexOf(movie);
    if (index !== -1) {
      // found movie in favourites
      return true;
    }
    return false; // did not find movie
  };
  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies, search } = this.props; // {movies:{}, search:{}}
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? '' : 'active-tabs'}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? 'active-tabs' : ''}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favorites
            </div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No Movies to display!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
function mapStateToProps(state){
  return{
    movies: state.movies,
    search: state.movies
  };
}
const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
