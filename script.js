let fakeData = {
    "dates": {
        "maximum": "2023-06-05",
        "minimum": "2023-04-18"
    },
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
            "genre_ids": [
                16,
                10751,
                12,
                14,
                35
            ],
            "id": 502356,
            "original_language": "en",
            "original_title": "The Super Mario Bros. Movie",
            "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
            "popularity": 3392.2,
            "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
            "release_date": "2023-04-05",
            "title": "The Super Mario Bros. Movie",
            "video": false,
            "vote_average": 7.8,
            "vote_count": 4327
        },
        {
            "adult": false,
            "backdrop_path": "/2I5eBh98Q4aPq8WdQrHdTC8ARhY.jpg",
            "genre_ids": [
                28,
                12,
                16,
                878
            ],
            "id": 569094,
            "original_language": "en",
            "original_title": "Spider-Man: Across the Spider-Verse",
            "overview": "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
            "popularity": 2921.844,
            "poster_path": "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
            "release_date": "2023-05-31",
            "title": "Spider-Man: Across the Spider-Verse",
            "video": false,
            "vote_average": 8.8,
            "vote_count": 739
        },
        {
            "adult": false,
            "backdrop_path": "/4t0oBFrJyweYPt0hocW6RUa0b6H.jpg",
            "genre_ids": [
                28,
                80,
                53
            ],
            "id": 385687,
            "original_language": "en",
            "original_title": "Fast X",
            "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
            "popularity": 2334.66,
            "poster_path": "/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
            "release_date": "2023-05-17",
            "title": "Fast X",
            "video": false,
            "vote_average": 7.1,
            "vote_count": 854
        },
    ],
    "total_pages": 98,
    "total_results": 1951
}
//TODO:
//Clean up the code for README and add comments(in the morning before work)
//record the video to submit the project

let curPage = 1;
const ApiKey = 'd9293d6f881f33b3ce1e80d6af4508ea';
let SearchBar = document.querySelector('#search-input');
let searchString = '';
let brokenImage = "https://static.vecteezy.com/system/resources/thumbnails/010/834/231/small/broken-chain-as-a-symbol-of-freedom-from-slavery-link-damage-vector.jpg";

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


