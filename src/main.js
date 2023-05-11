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
const lazyLoading = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting){
            const url =  entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    })
});

const createMovies = (movies, container, topicCounter)=>{
    //A modificar
    container.innerHTML = '';

    if (topicCounter != null){
        movies.splice(0,10).forEach((peli)=>{
            topicCounter++;
            const movieContainer = document.createElement('section');
            movieContainer.classList.add('movie');
            movieContainer.addEventListener('click',()=>{
                location.hash = '#movie=' + peli.id;
            });
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.id = `${peli.id}`;
            movieImg.setAttribute('alt', peli.title);
            movieImg.setAttribute(
                'data-img',
                'https://image.tmdb.org/t/p/w300' + peli.poster_path,
            );
            const numberImg = document.createElement('span');
            numberImg.classList.add('movie-number')
            numberImg.innerText = topicCounter;
            movieContainer.append(movieImg, numberImg);
            container.appendChild(movieContainer);
            lazyLoading.observe(movieImg);
        })
    }else{
        movies.splice(0,10).forEach(movie => {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container');
            movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
            });
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt', movie.title);
            movieImg.setAttribute(
            'data-img',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path,
            );
            movieContainer.appendChild(movieImg);
            container.appendChild(movieContainer);
            lazyLoading.observe(movieImg);
        });
    }
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
    const {data: movie} = await api(`movie/${id}`);

    const backgroundImageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieDetailImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    movieDetailImgBackground.style.background = `
            linear-gradient(rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
            url("${backgroundImageUrl}")
            `
    movieDetailTitle.textContent = movie.title;
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
async function getTrendingMovies (){
    const {data} = await api(`trending/movie/day`);
    const movieTop = data.results;
    createMovies(movieTop ,moviesCategoryContainer, null)
}