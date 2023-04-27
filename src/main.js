const API_KEY = "604eb6d13047e1a88a7aceb31755b398";

        /**
         * ?Acá se llaman a las películas que están en tendencia en la api */ 
async function getTrendingMoviesPreview(){
    let topicCounter = 0;
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    const data = await response.json();
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
        /**
         * ?Acá se llaman a las categorías de las pelis 
         * */ 
async function getCategoriesPreviewList(){
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    const categories = data.genres;

    categoryClass = [];
    categories.map(category =>{
        categoryClass.push(`
    <span class="category">${category.name}</span>
    `)})

    const categoryContainer = document.querySelector('.categories-container');
    return categoryContainer.innerHTML = categoryClass.join('');
}
getCategoriesPreviewList();

getTrendingMoviesPreview();




// const URL='http://52.15.53.173:5000/api/v1/files'
// async function consumir(){
//     const response = await fetch(URL);
//     const data = await response.json();
//     console.log(data);
// }
// consumir();