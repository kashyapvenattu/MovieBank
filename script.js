var searchBox = document.querySelector(".search-box");
var movieListItemTeamplate = document.querySelector("[movie-list-item-template]");
var movieListContainer = document.querySelector(".movie-list");

var items = [];

fetch('http://www.omdbapi.com/?apikey=37e320ad&s=man')
    .then(response => response.json())
    .then(list => {
        items = list.Search.map(item => {
            // console.log(item)
            const title = item.Title;
            const poster = item.Poster;
            const year = item.Year;

            // const movieListContent = `
            //     <div class="movie-list-item">
            //         <img class="movie-list-item-img" id="movie-list-item-img" src="${poster}" alt="${title}">
            //         <span class="movie-list-item-title">${title}</span>
            //         <p class="movie-list-item-year">${year}</p>
            //     </div>
            // `
            // document.getElementById("movie-list").innerHTML += movieListContent;

            var card = movieListItemTeamplate.content.cloneNode(true).children[0];

            var mvTitle = card.querySelector(".movie-list-item-title")
            var mvImg = card.querySelector(".movie-list-item-img")
            var mvyear = card.querySelector(".movie-list-item-year")

            mvTitle.textContent = title;
            mvImg.src = poster;
            mvyear.textContent = year;
            
            movieListContainer.append(card);


            return { title: title, element: card };
        })
        console.log("===", items);
    })


//Search
searchBox.addEventListener("input", e =>{
    var value = e.target.value.toLowerCase();
    console.log(value)
    var isVisible;
    items.forEach(item => {
        isVisible=item.title.toLowerCase().includes(value);
        item.element.classList.toggle("hide", !isVisible)
    })
})

// Carousel Logic
var arrows= document.querySelectorAll(".arrow");
var movieLists= document.querySelectorAll(".movie-list");

arrows.forEach((arrow,i)=>{
    var itemNumber;
    var ratio;
    // var itemNumber=movieLists[i].querySelectorAll("img").length;
    var clickCounter=0;
    arrow.addEventListener("click",()=>{
        console.log(items)
        itemNumber=movieLists[i].querySelectorAll("img").length;
        ratio= Math.floor(window.innerWidth / 270);
        clickCounter++;
        if((itemNumber - clickCounter - ratio) > 0){
            movieLists[i].style.transform=`translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value - 300}px)`;
        }
        else if((itemNumber - clickCounter - ratio) == 0){
            console.log('Its 00000')
            movieLists[i].style.transform=`translateX(-1)`;
        }
        else{
            movieLists[i].style.transform= "translateX(0)"
            clickCounter=0;
        }
    })
})



// Toggle Themes Dark -> Light
var toggleBall= document.querySelector(".toggle-ball");
var items= document.querySelectorAll(".content-container,.movie-list-title,.sidebar,.left-menu-icon,.navbar,.navbar-container,.toggle,.toggle-ball,.toggle-icon")

toggleBall.addEventListener("click",()=>{
    items.forEach(item=>{
        item.classList.toggle("active")
    })
})





