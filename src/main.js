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
console.log(data);
    const movieTop = data.results;

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
    categoryClass = [];
    categories.map(category =>{
        categoryClass.push(`
    <span id="${category.id}" class="category">${category.name}</span>
    `)})
    const categoryContainer = document.querySelector('.categories-container');
    return categoryContainer.innerHTML = categoryClass.join('');
}



// const URL='http://52.15.53.173:5000/api/v1/files'
// async function consumir(){
//     const response = await fetch(URL);
//     const data = await response.json();
//     console.log(data);
// }
// consumir();