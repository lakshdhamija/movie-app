import React from 'react';
import { data } from  '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions';

class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(() => {
      console.log('UPDATED', store.getState());
      this.forceUpdate();
    });
    // make API call
    // dispatch action 
    store.dispatch(addMovies(data));
  }
  isMovieFavourite = (movie) => {
    const {movies} = this.props.store.getState(); // {movies:{}, search:{}}
    const {favourites} = movies;
    const index = favourites.indexOf(movie);
    if(index !== -1){ // found movie in favourites
      return true;
    }
    return false; // did not find movie
  }
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }
  render() {
    const {movies, search} = this.props.store.getState(); // {movies:{}, search:{}}
    const {list, favourites, showFavourites } = movies; 
    console.log("RENDER", this.props.store.getState());

    const displayMovies = showFavourites ? favourites: list;
    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch} search={search}/>
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites?'active-tabs':''}`} onClick={() => this.onChangeTab(true)}>Favorites</div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch} 
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0?<div className="no-movies">No Movies to display!</div>: null }
        </div>
      </div>
    );
  }
}

export default App;
