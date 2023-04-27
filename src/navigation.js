window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log("El hash de la URL es: " + location.hash);
    
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

}

function homePage(){
    console.log("Home");
    getCategoriesPreviewList();
    getTrendingMoviesPreview();
}
function trendsPage(){
    console.log("trends");
}
function searchPage(){
    console.log("search");
}
function movieDetailsPage(){
    console.log("movie");
}
function categoriesPage(){
    console.log("category");
}