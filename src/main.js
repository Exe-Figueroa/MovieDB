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
//Se crea la función que llama a las películas en tendencia

async function getTrendingMoviesPreview(){
    let topicCounter = 0;
    const {data} = await api(`trending/movie/day`);
    const movieTop = data.results;
    console.log(movieTop);
    const movieTopList = [];
    movieTop.map(peli =>{
        topicCounter++;
        movieTopList.push(`
            <section class="movie">
                <img src=https://image.tmdb.org/t/p/w300${peli.poster_path} alt="${peli.title}" class="movie-img">
                <span class="movie-number">${topicCounter}</span>
            </section>
        `);
    });
    const movieTrendContainer = document.querySelector('.movie-trends-container');
    return movieTrendContainer.innerHTML = movieTopList.slice(0,20).join('');
}

//Se crea la función que llama a los nombres de las categorías

async function getCategoriesPreviewList(){
    const {data} = await api(`genre/movie/list`);
    const categories = data.genres;
    const categoryClass = [];
    categories.map(category =>{
        const categoryElement = document.createElement('span');
        categoryElement.id = category.id;
        categoryElement.className = 'category';
        categoryElement.innerText = category.name;
        categoryClass.push(categoryElement.outerHTML);
    })
    const categoryContainer = document.querySelector('.categories-container');
    categoryContainer.innerHTML = categoryClass.join('');
    // Agregamos un EventListener al objeto categoryContainer para capturar los eventos click en los elementos span con la clase category
    categoryContainer.addEventListener('click', function(event) {
        const clickedCategory = event.target;
        if (clickedCategory.classList.contains('category')) {
            location.hash = `#category=${clickedCategory.id}-${clickedCategory.innerText}`
            console.log(location.hash);
        }
    });
}
async function getMoviesByCategory(id){
    const {data} = await api(`discover/movie`, {
        params: {
            with_genres: id,
        }
    });
    const movie = data.results;
    const movieList = [];
    movie.map(peli =>{
        movieList.push(`
            
            <img src="https://image.tmdb.org/t/p/w300${peli.poster_path}" alt="${peli.title}" class="img-movie-category"> 
        `);
    });
    
    return moviesCategoryContainer.innerHTML = movieList.join('');
}