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
                movieList.push(`
                    <section class="movie">
                        <img src=https://image.tmdb.org/t/p/w300${peli.poster_path} alt="${peli.title}" class="movie-img">
                        <span class="movie-number">${topicCounter}</span>
                    </section>
                `);
            });
        }else{
            movies.map(peli =>{
                movieList.push(`
                        <img src=https://image.tmdb.org/t/p/w300${peli.poster_path} alt="${peli.title}" class="img-movie-category">
                `);
            });
        }
        return container.innerHTML = movieList.join('');
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