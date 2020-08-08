import React from 'react';
import { addFavourite, removeFromFavourites } from '../actions';
import { StoreContext } from '../index';

class MovieCard extends React.Component {
  handleFavouriteClick = () => {
    const { movie } = this.props;
    this.props.dispatch(addFavourite(movie));
  }

  handleUnfavouriteClick = () => {
    const { movie, dispatch } = this.props;
    dispatch(removeFromFavourites(movie));
  }
  render() {
    const { movie, isFavourite } = this.props
    return (
      <div className="movie-card">
        <div className="left">
          <img alt="movie-poster" src={movie.Poster} />
        </div>
        <div className="right">
          <div className="title">{movie.Title}</div>
          <div className="plot">{movie.Plot}</div>
          <div className="footer">
            <div className="rating">{movie.imdbRating}</div>
            {isFavourite ?
              <button className="unfavourite-btn" onClick={this.handleUnfavouriteClick}>Un-Favorite</button> :
              <button className="favourite-btn" onClick={this.handleFavouriteClick}>Favorite</button>}

          </div>
        </div>
      </div>
    );
  }
}

class MovieCardWrapper extends React.Component {
  render() {
    return (
      // getting store directly from context rather than props
      <StoreContext.Consumer>
        {(store) => <MovieCard
          dispath={store.dispatch}
          movie={this.props.movie}
          key={`movies-${this.props.key}`}
          isFavourite={this.props.isFavourite}
        />}
      </StoreContext.Consumer>
    )
  }
}

export default MovieCardWrapper;
