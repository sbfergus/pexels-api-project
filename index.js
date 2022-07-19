// 
var pexelKey = config.pexel_key;
var wordsKey = config.words_key;

let currentPage = 1;
var searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        var photos = data.photos;
        hero.style.display = 'none';
        photoGrid.style.display = 'block';
        lightNav();

        var photoNum = document.querySelector('.random-photo-num');
        if (photos.length > 0) {
            photoNum.textContent = `${randomNum()}k`;
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
    xhttp.setRequestHeader('Authorization', pexelKey);
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
    xhttp.setRequestHeader('Authorization', pexelKey);
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
        xhr.setRequestHeader("X-RapidAPI-Key", wordsKey);
        xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");

        xhr.send(data);
});


var rootElement = document.querySelector('.related-btns-container');
rootElement.addEventListener('click', rootElementClicked);
function rootElementClicked(event) {
    event.preventDefault();
    var searchValue = document.querySelector('#search-bar');
    searchValue.value = event.target.textContent;
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

const mobileMenuBtn = document.querySelector('.mobile-menu');
const cancelBtn = document.querySelector('.cancel');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const photoGrid = document.querySelector('.grid-container');
const mobileMenuOptions = document.querySelector('.mobile-menu-options');
const bell = document.querySelector('.bell');
const hero = document.querySelector('.hero');
const downCarrot = document.getElementsByClassName('down-carrot');



mobileMenuBtn.addEventListener('click', function() {
    mobileMenuOptions.style.display = 'block';
    photoGrid.style.display = 'none';
    darkNav();
})

cancelBtn.addEventListener('click', function() {
    mobileMenuOptions.style.display = 'none';
    if (window.getComputedStyle(hero).display === 'block') {
        transparentNav();
    } else {
        lightNav();
        photoGrid.style.display = 'block';
    }
})

function darkNav() {
    cancelBtn.style.display = 'block';
    mobileMenuBtn.style.display = 'none';
    nav.style.backgroundColor = 'black';
    nav.style.borderBottomColor = 'hsla(0,0%,100%,.2)';
    logo.src = 'images/PicHunter-logo-black.png';
    bell.style.filter = 'invert(1)';
    downCarrot[1].style.filter = 'invert(1)';
}

function lightNav() {
    cancelBtn.style.display = 'none';
    mobileMenuBtn.style.display = 'block';
    nav.style.backgroundColor = 'white';
    nav.style.borderBottomColor = '#f4f4f4';
    logo.src = 'images/PicHunter-logo.png';
    logo.style.filter = 'brightness(100%)';
    bell.style.filter = 'invert(0)';
    downCarrot[1].style.filter = 'invert(0)';
}

function transparentNav() {
    cancelBtn.style.display = 'none';
    mobileMenuBtn.style.display = 'block';
    nav.style.backgroundColor = 'transparent';
    nav.style.borderBottomColor = 'transparent';
    logo.src = 'images/PicHunter-logo.png';
    bell.style.filter = 'invert(0)';
    downCarrot[1].style.filter = 'invert(0)';
}

function randomNum() {
    var randomNumPhotos = Math.random()*100;
    return randomNumPhotos.toFixed(1);
}