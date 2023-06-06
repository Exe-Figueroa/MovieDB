let page = 1;
let maxPage;
let infinityScroll;
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infinityScroll, false);
btnBack.addEventListener('click', () => {
    location.hash = window.history.back();
});
btnSearch.addEventListener('click', ()=>{
    location.hash = `#search=${inputSearch.value}`
    page=1;
});
btnTrends.addEventListener('click', ()=>{
    location.hash = '#trends'
})
btnHome.addEventListener('click', ()=>{
    location.hash = null
})
btnSearchFooter.addEventListener('click', ()=>{
    location.hash = '#search='
})

function navigator() {
    if (infinityScroll) {
        window.removeEventListener('scroll', infinityScroll, {passive:false});
        infinityScroll = undefined;
    }

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
    if (infinityScroll) {
        window.addEventListener('scroll', infinityScroll, {passive : false});
        infinityScroll = undefined;
    }
}

function homePage(){
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
    getLikedMovies();
}
function trendsPage(){
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
    infinityScroll = getPaginationTrendingMovies;
}
function searchPage(){
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
    infinityScroll = getPaginationMoviesBySearch(query);
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
    infinityScroll = getPaginationMoviesByCategory(id);
}