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
const createMovies = (movies, container)=>{
        let topicCounter = 0;
        //A modificar
        const movieTopList = [];
        movies.map(peli =>{
            topicCounter++;
            movieTopList.push(`
                <section class="movie">
                    <img src=https://image.tmdb.org/t/p/w300${peli.poster_path} alt="${peli.title}" class="movie-img">
                    <span class="movie-number">${topicCounter}</span>
                </section>
            `);
            // const movieElement = document.createElement('span');
            // movieElement.id = item.id;
            // movieElement.className = 'category';
            // movieElement.innerText = item.name;
            // movieTopList.push(movieElement.outerHTML);
        });
        return container.innerHTML = movieTopList.slice(0,20).join('');
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
async function getTrendingMoviesPreview(){
    
    const {data} = await api(`trending/movie/day`);
    const movieTop = data.results;

    createMovies(movieTop ,movieTrendContainer)
}

//Se crea la función que llama a los nombres de las categorías

async function getCategoriesPreviewList(){
    const {data} = await api(`genre/movie/list`);
    const categories = data.genres;
    createCategories(categories, categoriesList);
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