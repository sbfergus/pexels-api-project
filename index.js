//563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193
let currentPage = 1;
var searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        var photos = data.photos;
        var randomNumPhotos = Math.random()*100;
        randomNumPhotos = randomNumPhotos.toFixed(1);
        var photoNum = document.querySelector('.random-photo-num');
        if (photos.length > 0) {
            photoNum.textContent = `${randomNumPhotos}k`;
        } else {
            photoNum.textContent = `0`;
        }
        
        currentPage++;
        console.log(photos);
        var grid = document.querySelector('.grid');
        
        grid.innerHTML = '';
        photos.forEach(function(pic) {
                var picture = document.createElement('div');
                picture.classList.add('grid-item');
                picture.innerHTML = `
                    <a href="${pic.url}">
                        <img src="${pic.src.large}" alt="${pic.alt}" width=400>
                    </a>
                    <div class="pic-hover-info">

                        <div class="collect-like">
                            <div class="pic-top-flex">
                                <img class="icon bookmark" 
                                    src="images/bookmark.png"
                                    alt="collect">
                                <img class="icon heart"
                                    src="images/heart.png"
                                    alt="like">
                            </div>
                        </div>

                        <div class="artist-name">
                            <div class="pic-bottom-flex">
                                <a href="${pic.photographer_url}">
                                    <div class="artist-flex">
                                        <img class="avatar" 
                                                src="https://images.pexels.com/lib/avatars/orange.png?w=40&h=40&fit=crop&dpr=1" 
                                                alt="artist avatar photo">
                                        <h5>${pic.photographer}</h5>
                                    </div>
                                </a>
                                <img class="icon download"
                                    src="images/download-icon.png"
                                    alt="download">
                            </div>    
                        </div>

                    </div>
                `;
                picture.addEventListener('mouseover', function() {
                        this.children[1].classList.add('active');
                });
                picture.addEventListener('mouseout', function() {
                    this.children[1].classList.remove('active');
                });
                    
            
            grid.appendChild(picture);
                
        });

        var msnry = new Masonry( grid, {
            itemSelector: '.grid-item',
            fitWidth: true,
            gutter: 25
        });
        imagesLoaded( grid ).on( 'progress', function() {
            msnry.layout();
        });
        
        }
    };
    var searchValue = document.querySelector('#search-bar').value;
    var searchName = document.querySelector('#search-name');
    searchName.textContent = searchValue;
    searchName.style.textTransform = "capitalize";

    xhttp.open("GET", `https://api.pexels.com/v1/search?query=${searchValue}&page=${currentPage}&per_page=30`, true);
    xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193');
    xhttp.send();
});


window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1 && currentPage < 6) {
        console.log('loaded more');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            var photos = data.photos;
            currentPage++;
            console.log(photos);
            var grid = document.querySelector('.grid');
            
            photos.forEach(function(pic) {
                    var picture = document.createElement('div');
                    picture.classList.add('grid-item');
                    picture.innerHTML = `
                        <a href="${pic.url}">
                            <img src="${pic.src.large}" alt="${pic.alt}" width=400>
                        </a>
                        <div class="pic-hover-info">

                            <div class="collect-like">
                                <div class="pic-top-flex">
                                    <img class="icon bookmark" 
                                        src="images/bookmark.png"
                                        alt="collect">
                                    <img class="icon heart"
                                        src="images/heart.png"
                                        alt="like">
                                </div>
                            </div>

                            <div class="artist-name">
                                <div class="pic-bottom-flex">
                                    <a href="${pic.photographer_url}">
                                        <div class="artist-flex">
                                            <img class="avatar" 
                                                    src="https://images.pexels.com/lib/avatars/orange.png?w=40&h=40&fit=crop&dpr=1" 
                                                    alt="artist avatar photo">
                                            <h5>${pic.photographer}</h5>
                                        </div>
                                    </a>
                                    <img class="icon download"
                                        src="images/download-icon.png"
                                        alt="download">
                                </div>    
                            </div>

                        </div>
                    `;
                    picture.addEventListener('mouseover', function() {
                            this.children[1].classList.add('active');
                    });
                    picture.addEventListener('mouseout', function() {
                        this.children[1].classList.remove('active');
                    });
                        
                grid.appendChild(picture);
                    
            });

            var msnry = new Masonry( grid, {
                itemSelector: '.grid-item',
                fitWidth: true,
                gutter: 25
            });
            imagesLoaded( grid ).on( 'progress', function() {
                msnry.layout();
            });
            
        };
    };
    var searchValue = document.querySelector('#search-bar').value;

    xhttp.open("GET", `https://api.pexels.com/v1/search?query=${searchValue}&page=${currentPage}&per_page=15`, true);
    xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193');
    xhttp.send();
    }
}, {
    passive: true
});



searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        var wordsContainer = document.querySelector('.related-btns-container');
        wordsContainer.style.display = 'flex';
        wordsContainer.innerHTML = '';
        var galleryTitle = document.querySelector('.gallery-title');
        galleryTitle.style.paddingTop = '25px';
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                var words = JSON.parse(this.responseText);
                var maxTenWords = words.typeOf.slice(0,15);
                maxTenWords.forEach(function(word) {
                    var wordBtn = document.createElement('div');
                    wordBtn.classList.add('word');
                    wordBtn.innerHTML = word;
                    wordsContainer.appendChild(wordBtn);
                })
            }
        });

        var searchValue = document.querySelector('#search-bar').value;

        xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${searchValue}/typeOf`);
        xhr.setRequestHeader("X-RapidAPI-Key", "cbf93f50c0mshe3f948be30aeef0p110453jsn29d15e377c7a");
        xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");

        xhr.send(data);
});


var rootElement = document.querySelector('.related-btns-container');
rootElement.addEventListener('click', rootElementClicked);
function rootElementClicked(event) {
    event.preventDefault();
    var searchValue = document.querySelector('#search-bar');
    searchValue.value = event.target.textContent;
    console.log(searchValue.value);
    searchForm.requestSubmit(); 
  }


const filters = document.querySelector('.filters');
const filterDropdown = document.querySelector('.filter-dropdown');
const filterIcon = document.querySelector('.filter-icon');
let rotated = false;

filters.addEventListener('click', function() {
    filterDropdown.classList.toggle("show-dropdown");
    if (rotated) {
        filterIcon.classList.add('rotate-up');
        rotated = false;
    } else {
        filterIcon.classList.remove('rotate-up')
        filterIcon.classList.add('rotate-down');
        rotated = true;
    }
});

const mobileMenu = document.querySelector('.mobile-menu');
const cancelBtn = document.querySelector('.cancel');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const photoGrid = document.querySelector('.grid-container');
const mobileMenuOptions = document.querySelector('.mobile-menu-options');
const bell = document.querySelector('.bell'); 
mobileMenu.addEventListener('click', function() {
    mobileMenu.style.display = 'none';
    cancelBtn.style.display = 'block';
    nav.style.backgroundColor = 'black';
    nav.style.borderColor = 'hsla(0,0%,100%,.2)';
    logo.src = 'images/PicHunter-logo-black.png';
    photoGrid.style.display = 'none';
    mobileMenuOptions.style.display = 'block';
    bell.style.filter = 'invert(1)';
})
cancelBtn.addEventListener('click', function() {
    cancelBtn.style.display = 'none';
    mobileMenu.style.display = 'block';
    nav.style.backgroundColor = 'white';
    logo.src = 'images/PicHunter-logo.png';
    photoGrid.style.display = 'block';
    mobileMenuOptions.style.display = 'none';
    bell.style.filter = 'invert(0)';
})
