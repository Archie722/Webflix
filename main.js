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
const poster1 = document.getElementById('poster-image-1');
const poster2 = document.getElementById('poster-image-2');
const poster3 = document.getElementById('poster-image-3');
const poster4 = document.getElementById('poster-image-4');
const poster5 = document.getElementById('poster-image-5');
const poster6 = document.getElementById('poster-image-6');
const poster7 = document.getElementById('poster-image-7');
const poster8 = document.getElementById('poster-image-8');
const poster9 = document.getElementById('poster-image-9');
const poster10 = document.getElementById('poster-image-10');
const poster11 = document.getElementById('poster-image-11');
const poster12 = document.getElementById('poster-image-12');
const poster13 = document.getElementById('poster-image-13');
const poster14= document.getElementById('poster-image-14');
const poster15= document.getElementById('poster-image-15');
const poster16= document.getElementById('poster-image-16');
const poster17= document.getElementById('poster-image-17');
const poster18= document.getElementById('poster-image-18');
const poster19= document.getElementById('poster-image-19');
const poster20= document.getElementById('poster-image-20');
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
            const posterObject1 = results[0];
            const posterObject2 = results[1];
            const posterObject3 = results[2];
            const posterObject4 = results[3];
            const posterObject5 = results[4];
            const posterObject6 = results[5];
            const posterObject7 = results[6];
            const posterObject8 = results[7];
            const posterObject9 = results[8];
            const posterObject10 = results[9];
            const posterObject11= results[10];
            const posterObject12 = results[11];
            const posterObject13 = results[12];
            const posterObject14= results[13];
            const posterObject15= results[14];
            const posterObject16= results[15];
            const posterObject17= results[16];
            const posterObject18= results[17];
            const posterObject19= results[18];
            const posterObject20= results[19];
            function posterSearch(posterObject) {
                renderDescription(posterObject)
                renderHeroMovieTitle(posterObject)
                renderHeroMovieStars(posterObject)
                getMovieImages(posterObject)
                getMovieTrailer(posterObject)
                getMovieInfo(posterObject)
                heroImage.scrollIntoView();
            }
            poster1.onclick = function() {  
                posterSearch(posterObject1);
            }
            poster2.onclick = function() {  
                posterSearch(posterObject2);
            }
            poster3.onclick = function() {  
                posterSearch(posterObject3);
            }
            poster4.onclick = function() {  
                posterSearch(posterObject4);
            }
            poster5.onclick = function() {  
                posterSearch(posterObject5);
            }
            poster6.onclick = function() {  
                posterSearch(posterObject6);
            }
            poster7.onclick = function() {  
                posterSearch(posterObject7);
            }
            poster8.onclick = function() {  
                posterSearch(posterObject8);
            }
            poster9.onclick = function() {  
                posterSearch(posterObject9);
            }
            poster10.onclick = function() {  
                posterSearch(posterObject10);
            }
            poster11.onclick = function() {  
                posterSearch(posterObject11);
            }
            poster12.onclick = function() {  
                posterSearch(posterObject12);
            }
            poster13.onclick = function() {  
                posterSearch(posterObject13);
            }
            poster14.onclick = function() {  
                posterSearch(posterObject14);
            }
            poster15.onclick = function() {  
                posterSearch(posterObject15);
            }
            poster16.onclick = function() {  
                posterSearch(posterObject16);
            }
            poster17.onclick = function() {  
                posterSearch(posterObject17);
            }
            poster18.onclick = function() {  
                posterSearch(posterObject18);
            }
            poster19.onclick = function() {  
                posterSearch(posterObject19);
            }
            poster20.onclick = function() {  
                posterSearch(posterObject20);
            }
            const posterObjectList = [posterObject1, posterObject2, posterObject3, posterObject4, posterObject5, posterObject6, posterObject7, posterObject8, posterObject9, posterObject10, posterObject11, posterObject12, posterObject13, posterObject14, posterObject15, posterObject16, posterObject17, posterObject18, posterObject19, posterObject20];
            const randomMovie = posterObjectList[Math.floor(Math.random() * posterObjectList.length)];
            posterSearch(randomMovie);

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