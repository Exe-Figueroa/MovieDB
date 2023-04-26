console.log('hola');
const API_KEY = "604eb6d13047e1a88a7aceb31755b398";
async function getTrendingMoviesPreview(){
    const response = await fetch(`http://192.168.100.48:5000/api/v1/files`);
    const data = await response.json();
//     const movieTop = data.results;
    
//     const movieTopList = `${movieTop.map(peli =>{
//         `
//         <section class="movie">
//                 <img src="https://i.blogs.es/617177/super-mario-bros-pelicula-mario/450_1000.webp" alt="${peli.title}" class="movie-img">
//                 <span class="movie-number">1</span>
//         </section>
//         `
//         console.log(peli.title)
//     })
// }`
return data;

}

getTrendingMoviesPreview();