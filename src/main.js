const API_KEY = "604eb6d13047e1a88a7aceb31755b398";
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json; charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});
//Se crea la función que llama a las películas de manera automática
const createMovies = (movies, container, topicCounter)=>{
        //A modificar
        const movieList = [];
        if (topicCounter != null){
            movies.map(peli =>{
                topicCounter++;
                const movieElement = document.createElement('section');
                movieElement.className='movie';
                const movieImg = document.createElement('img');
                movieImg.id = peli.id;
                movieImg.className = 'movie-img';
                movieImg.src = `https://image.tmdb.org/t/p/w300${peli.poster_path}`
                const number = document.createElement('span');
                number.className = 'movie-number';
                number.innerText = topicCounter
                movieElement.append(movieImg, number);
                movieList.push(movieElement.outerHTML);
            })
            container.innerHTML = movieList.splice(0,10).join('');
        }else{
            movies.map(peli =>{
                const movieImg = document.createElement('img');
                movieImg.id = peli.id;
                movieImg.className = 'movie-img';
                movieImg.src = `https://image.tmdb.org/t/p/w300${peli.poster_path}`
                movieList.push(movieImg.outerHTML);
            });
            container.innerHTML = movieList.join('');
        }
            container.addEventListener('click', (event)=>{
                const clickedMovie = event.target;
                if (clickedMovie.classList.contains('movie-img')){
                    location.hash = `#movie=${clickedMovie.id}`
                }
            })

}
//Se crea una función para poder llamar a categorías de manera automática y así no repetir código

const createCategories = (category, container)=>{
    const categoryClass = [];
    category.map(item =>{
        const categoryElement = document.createElement('span');
        categoryElement.id = item.id;
        categoryElement.className = 'category';
        categoryElement.innerText = item.name;
        categoryClass.push(categoryElement.outerHTML);
    })
    container.innerHTML = categoryClass.join('');
    container.addEventListener('click', function(event) {
        const clickedCategory = event.target;
        if (clickedCategory.classList.contains('category')) {
            location.hash = `#category=${clickedCategory.id}-${clickedCategory.innerText}`
            console.log(location.hash);
        }
    });
}
//Se traen las pelis de trending
async function getTrendingMoviesPreview(){
    const {data} = await api(`trending/movie/day`);
    const movieTop = data.results;
    let topicCounter = 0;
    createMovies(movieTop ,movieTrendContainer, topicCounter)
}

//Se crea la función que llama a los nombres de las categorías
async function getCategoriesPreviewList(){
    const {data} = await api(`genre/movie/list`);
    const categories = data.genres;
    createCategories(categories, categoriesList);
}
//Se traen las pelis por el query del search
async function getMoviesBySearch(query){
    const {data} = await api(`search/movie`, {
        params: {
            query, 
        }
    });
    const movie = data.results;
    createMovies(movie, moviesCategoryContainer, null) //Arreglar esto
}
//Se traen Pelis por id. Eso funciona con las categorias del getCategoryPreviewList
async function getMoviesByCategory(id){
    const {data} = await api(`discover/movie`, {
        params: {
            with_genres: id,
        }
    });
    const movie = data.results;
    createMovies(movie ,moviesCategoryContainer, null)
}
async function getMovieById(id){
    if (document.querySelector('.movie-detail-img')) {
        const movieDetailImg = document.querySelector('.movie-detail-img')
        movieDetailImg.remove()
    }
    const {data: movie} = await api(`movie/${id}`);
    const backgroundImageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const movieDetailImg =  document.createElement('img');
    movieDetailImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    movieDetailImg.className = 'movie-detail-img'
    movieDetailContent.insertAdjacentElement('afterbegin', movieDetailImg)
    movieDetailImgBackground.style.background = `
            linear-gradient(rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
            url("${backgroundImageUrl}")
            `
    movieDetailTitle.textContent = movie.title;
    console.log(movie);
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    createCategories(movie.genres, movieDetailCategoryContainer);
    getSimilarMoviesById(id)
}
async function getSimilarMoviesById(id){
    const {data} = await api(`movie/${id}/recommendations`);
    const similarMovies = data.results;
    createMovies(similarMovies, similarMoviesContainer, null)
}