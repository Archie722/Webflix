const apiKey = '259f94cd5d495f4911d73754b6956f7e';

//HTML Elements
// Search box
const movieInput = document.getElementById('movie-input');
const submitButton = document.getElementById('submit-button');
// hero movie area
const movieDescription = document.getElementById('movie-blurb');
const heroMovieTitle = document.getElementById('hero-title');
const heroImage = document.getElementById('hero-image');
const heroMovieRating = document.getElementById('rating');
const genres = document.getElementById('genres');
const coverPicture = document.getElementById('poster-image');
// Smaller movie images and info throughout the page
const posterTitles = document.getElementsByClassName('poster-title');
const posterImages = document.getElementsByClassName('poster-image');
const posterDate = document.getElementsByClassName('poster-date');
const posterRating = document.getElementsByClassName('poster-rating');
// Embedded youtube video at the bottom of the page
const movieTrailer = document.getElementById('movieTrailer');
// Function to execute when Submit is clicked
function getTextInput(){
    submitButton.onclick = function() {  
        getMovie();
        return false;
    };
}
// Async API call to themoviedb.com to get movie details
async function getMovie(){
    const movie = movieInput.value
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`;
    try{
        const response = await fetch(movieUrl);
        if(response.ok){
            const jsonResponse = await response.json();
            const topResult = jsonResponse.results[0];
            console.log(topResult);
            // render the description of the top result
            renderDescription(topResult);
            // get hero section movie title
            renderHeroMovieTitle(topResult);
            // ger the average vote for movie
            renderHeroMovieStars(topResult);
             // get the image of the top result
            getMovieImages(topResult);
            // get the trailer for the movie
            getMovieTrailer(topResult);
            // get the general info about a movie - for genres
            getMovieInfo(topResult);
            }
    }catch(error){
        console.log(error);
    }
}
async function getTrendingList(){
    const movieListQuery = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
    const base_url = 'https://image.tmdb.org/t/p/';
    const file_size = 'original';
    try{
        const response = await fetch(movieListQuery);
        if(response.ok){
            const jsonResponse = await response.json();
            // console.log(jsonResponse);
            // holds the json resonse of the results
            const results = jsonResponse.results;
            console.log(results);
            // holds a list of all the trending titles
            const titleList = []
            results.forEach(element => titleList.push(element.title));
            // console.log(titleList);
            // loop to add the titles in titleList to the unnerHTML of elements with the class poster-titles held in the posterTitles variable
            for(let i = 0; i < posterTitles.length; i++){
                posterTitles[i].innerHTML = titleList[i]}
            // create an empty list to hold poster image URL's
            const posterUrlList = []
            // loop through the results and push the beginning part of the URL along with the result URL to the list
            results.forEach(element => posterUrlList.push(base_url + file_size + element.poster_path));
            // console.log(posterUrlList);
            // for loop to add the poster URL's the the src attribute of the poster-images class elements held in the variable posterImages 
            for(let i = 0; i < posterImages.length; i++){
                posterImages[i].src = posterUrlList[i]
            }
            // get the poster ratings
            const posterRatingsList = [];
            results.forEach(element => posterRatingsList.push(element.vote_average));
            // console.log(posterRatingsList);
            for(let i =0; i < posterRating.length; i++){
            posterRating[i].innerHTML = posterRatingsList[i];
            };
        
            //get the poster release date
            const posterDateList = [];
            // the slich method takes the year only from the result and pushes it to the list
            results.forEach(element => posterDateList.push(element.release_date.slice(0, 4)));
            for(let i =0; i < posterDate.length; i++){
                posterDate[i].innerHTML = posterDateList[i];
            }
            // console.log(posterDateList)

        }
    }catch(error){
        console.log(error);
    }  
}

async function getMovieInfo (topResult){
    const movieId = topResult.id;
    const query = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    try{
       const response = await fetch(query);
       if(response.ok){
           const jsonResponse = await response.json();
        //    console.log(jsonResponse);
           const genre1 = jsonResponse.genres[0];
           const genre1Name = genre1.name;
           const genre2 = jsonResponse.genres[1];
           const genre2Name = genre2.name;
           const genre3 = jsonResponse.genres[2];
           const genre3Name = genre3.name;
            genres.innerHTML = `${genre1Name} | ${genre2Name} | ${genre3Name}`;
       }
    }catch(error){
        console.log(error);
    }   
}

// async request to API to get movie image
async function getMovieImages (topResult){
    const movieId = topResult.id;
    const base_url = 'https://image.tmdb.org/t/p/'
    const file_size = 'original'
    const imageQuery = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}&include_image_language=en,null`;
    try{
        const imageResponse = await fetch(imageQuery);
        if(imageResponse.ok){
            const imageJsonResponse = await imageResponse.json();
            // console.log(imageJsonResponse);
            const firstImage = imageJsonResponse.posters[0];
            const firstBackdrop = imageJsonResponse.backdrops[0];
            const posterUrl = firstImage.file_path;
            const backdropUrl = firstBackdrop.file_path;
            const fullUrl = base_url + file_size + posterUrl
            const backdropFullUrl = base_url + file_size + backdropUrl;
            // console.log(backdropFullUrl);
            // coverPicture.src = fullUrl;
            heroImage.style.background = 
            `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,1) 100%), url(${backdropFullUrl})`;
            heroImage.style.backgroundSize = 'cover';
           
        }
    }catch(error){
        console.log(error);
    }
}
async function getMovieTrailer (topResult){
    const movieId = topResult.id;
    const base_url = 'https://www.youtube.com/embed/'
    // const file_size = 'w500'
    const imageQuery = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;
    try{
        const videoResponse = await fetch(imageQuery);
        if(videoResponse.ok){
            const videoJsonResponse = await videoResponse.json();
            // console.log(videoJsonResponse);
            const firstTrailer = videoJsonResponse.results[0];
            const videoKey = firstTrailer.key;
            const fullUrl = base_url + videoKey
            // console.log(fullUrl);
            movieTrailer.src = fullUrl;
        }
    }catch(error){
        console.log(error);
    }
}

//Render description
const renderDescription = topResult => {
    const description = topResult.overview;
    movieDescription.innerHTML = description;
}
const renderHeroMovieTitle = topResult => {
    const title = topResult.original_title;
    heroMovieTitle.innerHTML = title;
};

const renderHeroMovieStars = topResult => {
    const rating = topResult.vote_average;
    heroMovieRating.innerHTML = rating;
};
// Main execution
getTextInput();
getTrendingList();
// https://image.tmdb.org/t/p/w500//Pv6vu1lxgct3GWhUXVVOMZwNlZ.jpg