window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
btnBack.addEventListener('click', () => {
    location.hash = window.history.back();
});
btnSearch.addEventListener('click', ()=>{
    location.hash = `#search=${inputSearch.value}`
});
btnTrends.addEventListener('click', ()=>{
    location.hash = '#trends'
})

function navigator() {
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
    form.classList.add("inactive");
    imgHeader.classList.add("inactive");
    searchHeader.classList.remove("inactive");
    trendsPreview.classList.add("inactive");
    categoriesList.classList.add("inactive");
    movieCategory.classList.remove("inactive");
    movieDetails.classList.add("inactive");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    h2Title.innerHTML = 'Trends';
    getTrendingMoviesPreview();
    getTrendingMovies()
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
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query); 
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function movieDetailsPage(){
    // header.classList.add("inactive");
    titleHeader.classList.add("inactive");
    form.classList.add("inactive");
    imgHeader.classList.add("inactive");
    searchHeader.classList.remove("inactive");
    trendsPreview.classList.add("inactive");
    categoriesList.classList.add("inactive");
    movieCategory.classList.add("inactive");
    movieDetails.classList.remove("inactive");
    h2Title.innerHTML='Movie Details';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const [_, id] = location.hash.split('=')
    getMovieById(id);
}
function categoriesPage(){
    titleHeader.classList.remove("inactive");
    imgHeader.classList.remove("inactive");
    searchHeader.classList.add("inactive");
    form.classList.remove("inactive");
    trendsPreview.classList.remove("inactive"); 
    categoriesList.classList.remove("inactive");    
    movieDetails.classList.add("inactive");
    movieCategory.classList.remove("inactive");
    const [_, categoryData] = location.hash.split('=');
    const[id, noMeInteresa]=categoryData.split('-')
    getCategoriesPreviewList();
    getTrendingMoviesPreview();
    getMoviesByCategory(id); 
}