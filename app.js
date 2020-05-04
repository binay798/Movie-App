



//Fetch data for all movies
async function allMovies() {
    let movieContainer = document.querySelector(".movie-container");
    try {
        let result = await fetch(`https://yts.mx/api/v2/list_movies.json&limit=50&`);
        let resultInJson = await result.json();
        let movies = resultInJson.data.movies;
        

        //display movies
        movieContainer.innerHTML = '';
        movies.forEach((item,index)=> {
           
            movieContainer.innerHTML += `<div class="col-sm-3 movie mt-4"><div class="view"><button class="viewButton">View Details</button>
                                    </div><img src="${item.medium_cover_image}" class="img-fluid" alt=""></div>`;
        });
        detail(movies);
        
    }catch(error) {
        console.log("No results found");
        movieContainer.innerHTML = '<h1>No results found</h1>';
    }

    
    
}
allMovies();

//Search fuctionality

document.querySelector(".search-button").addEventListener("click",() => {
    let name,id;
    name = document.querySelector("#name").value;
    id = document.querySelector("#id").value;

    if(name !== "") {
        searchMovie(name);
    }

})
document.addEventListener("keypress",(e) => {

    if(e.keyCode === 13 || e.which === 13) {
        let name,id;
        name = document.querySelector("#name").value;
        id = document.querySelector("#id").value;
    
        if(name !== "") {
            searchMovie(name);
        }
    }
    
})
async function searchMovie(movie) {
    try {
        let result = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${movie}&sort_by=year`);
        let data = await result.json();
        movies = data.data.movies;
        displaySearchedMovies(movies);
        document.querySelector("#name").value = "";
    }catch(error) {
        console.log(error);
        movieContainer.innerHTML = '<h1>No results found</h1>';
    }
    
}



//Display searched movies
async function displaySearchedMovies(movies) {
    let movieContainer = document.querySelector(".movie-container");
    try{
        let movieContainer = document.querySelector(".movie-container");
        movieContainer.innerHTML = '';

        movies.forEach(item => {
            movieContainer.innerHTML += `<div class="col-sm-3 movie mt-4"><div class="view"><button class="viewButton">View Details</button>
                                        </div><img src="${item.medium_cover_image}" class="img-fluid" alt=""></div>`;
        })
        detail(movies);
    }catch {
        movieContainer.innerHTML = "<h1 class='text-white p-4'>No results found</h1>";
    }
    
    
}


//click on view details
async function detail(movies) {
    let viewButton = document.querySelectorAll(".viewButton");
    viewButton.forEach((item,index) => {
        item.addEventListener("click",(e) => {
            let movie = movies[index]
            showDetail(movie);
        })
})
}
//Display movie detail
async function showDetail(movie) {
    console.log(movie);
    let movieContainer = document.querySelector(".movie-container");
    movieContainer.innerHTML = '';
    movieContainer.innerHTML = `<div class="container movie-detail pt-4"><div class="row">
    <div class="col-sm-3">
        <img class="img-fluid" src="${movie.medium_cover_image}">
    </div>
    <div class="col-sm-3 d-flex flex-column text-white">
        <h1>${movie.title}</h1>
        <p>${movie.year}</p>
        <span><i class="fa fa-star" style="color:white;"></i> Rating: ${movie.rating}</span>
        <span><i class="fa fa-clock-o"></i> Duration: ${movie.runtime} min</span>
        <a href="${movie.url}" target="blank"><button class="btn btn-success">Download</button></a>
    </div>
    <div class="col-sm-6 text-white ">
        <h1>Description</h1>
        <p>${movie.summary}</p>
    </div>
    </div</div`;

    
    
}

