window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
btnBack.addEventListener('click', ()=>{
    location.hash = '#home'
});
btnSearch.addEventListener('click', ()=>{
    location.hash = '#search='
});
btnTrends.addEventListener('click', ()=>{
    location.hash = '#trends'
})

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
    titleHeader.classList.remove("inactive");
    imgHeader.classList.remove("inactive");
    searchHeader.classList.add("inactive");
    form.classList.remove("inactive");
    trendsPreview.classList.remove("inactive"); 
    categoriesList.classList.remove("inactive");    
    movieDetails.classList.add("inactive");
    movieCategory.classList.remove("inactive");
    // header.classList.remove("inactive");
    getCategoriesPreviewList();
    getTrendingMoviesPreview();
}
function trendsPage(){
    console.log("trends");
    // titleHeader.classList.add("inactive");
    titleHeader.classList.add("inactive");
    form.classList.remove("inactive");
    imgHeader.classList.add("inactive");
    searchHeader.classList.remove("inactive");
    trendsPreview.classList.add("inactive");
    categoriesList.classList.add("inactive");
    movieCategory.classList.remove("inactive");
    movieDetails.classList.add("inactive");
}
function searchPage(){
    console.log("search");
    titleHeader.classList.add("inactive");
    form.classList.remove("inactive");
    imgHeader.classList.add("inactive");
    searchHeader.classList.remove("inactive");
    trendsPreview.classList.add("inactive");
    categoriesList.classList.add("inactive");
    movieCategory.classList.remove("inactive");
    movieDetails.classList.add("inactive");
}
function movieDetailsPage(){
    console.log("movie");
    // header.classList.add("inactive");
    titleHeader.classList.add("inactive");
    form.classList.add("inactive");
    imgHeader.classList.add("inactive");
    searchHeader.classList.remove("inactive");
    trendsPreview.classList.add("inactive");
    categoriesList.classList.add("inactive");
    movieCategory.classList.add("inactive");
    movieDetails.classList.remove("inactive");
}
function categoriesPage(){
    console.log("category");
}