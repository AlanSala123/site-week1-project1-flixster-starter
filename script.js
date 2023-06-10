
let curPage = 1;
const ApiKey = 'd9293d6f881f33b3ce1e80d6af4508ea';
let SearchBar = document.querySelector('#search-input');
let searchString = '';
let brokenImage = "https://static.vecteezy.com/system/resources/thumbnails/010/834/231/small/broken-chain-as-a-symbol-of-freedom-from-slavery-link-damage-vector.jpg";

//fetch Api
async function ApiCall() {
    const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${ApiKey}&page=${curPage}`
    const res = await fetch(URL);
    const data = await res.json();
    const movies = data.results;
    movies.forEach(movie => {
       if (movie !== null && movie != undefined) {
            generateCards(movie);
       }
    });
}

//fetch API for the first time(make sure all the cards are on the screen)
async function firstAPICall() {
    const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${ApiKey}&page=${curPage}`
    const res = await fetch(URL);
    const data = await res.json();
    const movies = data.results;
    movies.forEach(movie => {
        if (movie !== null && movie != undefined) {
            generateCards(movie);
       }
    });
}

//fetch API for when a user searches
async function QueryCall() {
    const URL = `https://api.themoviedb.org/3/search/movie?query=${searchString}&api_key=${ApiKey}`
    const res = await fetch(URL);
    const data = await res.json();
    const movies = data.results;
    movies.forEach(movie => {
        if (movie !== null && movie != undefined) {
            generateCards(movie);
       }
    });
}

//grabbing the grid in the HTML file
const entireContainer = document.querySelector("#movies-grid")

function generateCards(movieObject) {
    //create star
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent = document.createTextNode('⭐️');
    star.appendChild(starContent);

    //create rating
    let rating = document.createElement('span');
    rating.classList.add('movie-votes');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.appendChild(ratingContent);

    //create average container
    let averageContainer = document.createElement('div');
    averageContainer.classList.add('average');
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);

    //create Image
    let image = document.createElement('img');
    image.classList.add('movie-poster');
    image.alt = "This is the movie " + movieObject.title;
    //if there is no poster then we will just use the image from google
    if (movieObject.poster_path) {
        image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    } 
    else {
        image.src = brokenImage;
    }

    //create the title
    let title = document.createElement('div');
    title.classList.add('movie-title');
    title.innerText = movieObject.original_title;

    //create the entire section for a specific movie
    let movie = document.createElement('section');
    movie.classList.add('movie-card');
    movie.appendChild(image);
    movie.appendChild(averageContainer);
    movie.appendChild(title);
    entireContainer.appendChild(movie);
}
//make the first API call
firstAPICall();

//everytime the loadmore button is pressed add another page of movies
let button = document.querySelector('.load-more-movies-btn');
button.addEventListener("click", () => {
    curPage += 1;
    ApiCall();
})

//the search bar when we are adding the input inside of the search bar 
SearchBar.addEventListener("input", (event) => {
    entireContainer.innerHTML = '';
    searchString = event.target.value;
    if (event.target.value == '') {
        firstAPICall();
    }
    QueryCall();
})


