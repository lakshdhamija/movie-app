// {
//     type: 'ADD_MOVIES'
// }
// {
//     type: 'REMOVE_MOVIES'
// }


// action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITES = 'ADD_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';


// action creators
export function addMovies(movies){
    return{
        type: ADD_MOVIES,
        movies: movies
    }
}
export function addFavourite(movie){
    return{
        type: ADD_FAVOURITES,
        movie: movie
    }
}
export function removeFromFavourites(movie){
    return{
        type: REMOVE_FROM_FAVOURITES,
        movie: movie
    }
}